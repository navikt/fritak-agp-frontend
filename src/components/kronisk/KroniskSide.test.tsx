import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'vitest-axe';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import env from '../../config/environment';
import HttpStatus from '../../api/HttpStatus';
import postKronisk from '../../api/kronisk/postKronisk';
import testFnr from '../../mock/testFnr';

vi.mock('../../api/kronisk/postKronisk', () => ({
  default: vi.fn()
}));

const initHistory = ['/'];

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
        t: (str: string) => str
      }
    };
  }
}));

vi.spyOn(env, 'minSideArbeidsgiver', 'get').mockReturnValue(
  'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/sak-restore-session'
);

describe('KroniskSide', () => {
  beforeEach(() => {
    vi.mocked(postKronisk).mockReset();
    vi.mocked(postKronisk).mockReturnValue(new Promise(() => {}));
  });

  const fillValidSoknad = async () => {
    const user = userEvent.setup();
    await user.upload(
      screen.getByLabelText('KRONISK_SIDE_UPLOAD'),
      new File([`%PDF-1.4\n${'content'.repeat(100)}`], 'dokumentasjon.pdf', { type: 'application/pdf' })
    );
    await screen.findByText('dokumentasjon.pdf');
    await user.type(screen.getByLabelText('FODSELSNUMMER_LABEL'), testFnr.GyldigeFraDolly.TestPerson1);
    await user.type(screen.getByRole('textbox', { name: /VIRKSOMHETSNUMMER_LABEL/ }), '315587336');
    await user.click(screen.getByRole('checkbox', { name: 'KRONISK_SIDE_PERIODER_UNNTAK' }));
    await user.click(screen.getByRole('checkbox', { name: 'BEKREFTOPPLYSNINGER_BEKREFT_LABEL' }));
    await user.click(screen.getByRole('button', { name: 'KRONISK_SIDE_SUBMIT' }));
  };

  it.each([
    { path: '/nb/kronisk/soknad', route: '/:language/kronisk/soknad', receipt: '/nb/kronisk/soknad/kvittering' },
    { path: '/en/kronisk/soknad', route: '/:language/kronisk/soknad', receipt: '/en/kronisk/soknad/kvittering' },
    { path: '/kronisk/soknad', route: '/kronisk/soknad', receipt: '/nb/kronisk/soknad/kvittering' }
  ])('replaces $path with $receipt after successful submission', async ({ path, route, receipt }) => {
    const consoleError = vi.spyOn(console, 'error');
    vi.mocked(postKronisk).mockResolvedValue({ status: HttpStatus.Created, violations: [] });
    const router = createMemoryRouter(
      [
        { path: '/before', element: <div>Before form</div> },
        { path: route, element: <KroniskSide /> },
        { path: receipt, element: <div>Receipt</div> }
      ],
      { initialEntries: ['/before', path], initialIndex: 1 }
    );

    try {
      render(<RouterProvider router={router} />);

      await fillValidSoknad();

      await waitFor(() => expect(router.state.location.pathname).toBe(receipt));
      expect(postKronisk).toHaveBeenCalledTimes(1);
      expect(router.state.historyAction).toBe('REPLACE');
      expect(consoleError.mock.calls.flat().join(' ')).not.toMatch(
        /Cannot update a component|You should call navigate\(\) in a React\.useEffect/
      );

      await act(() => router.navigate(-1));

      expect(router.state.location.pathname).toBe('/before');
    } finally {
      consoleError.mockRestore();
      router.dispose();
    }
  });

  it('stays on the form when validation fails', async () => {
    const router = createMemoryRouter([{ path: '/nb/kronisk/soknad', element: <KroniskSide /> }], {
      initialEntries: ['/nb/kronisk/soknad']
    });
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByRole('button', { name: 'KRONISK_SIDE_SUBMIT' }));

    expect(postKronisk).not.toHaveBeenCalled();
    expect(router.state.location.pathname).toBe('/nb/kronisk/soknad');
    expect(screen.getByRole('button', { name: 'KRONISK_SIDE_SUBMIT' })).toBeVisible();
    router.dispose();
  });

  it('stays on the form when the server returns an error', async () => {
    vi.mocked(postKronisk).mockResolvedValue({ status: HttpStatus.Error, violations: [] });
    const router = createMemoryRouter([{ path: '/nb/kronisk/soknad', element: <KroniskSide /> }], {
      initialEntries: ['/nb/kronisk/soknad']
    });
    render(<RouterProvider router={router} />);

    await fillValidSoknad();

    await waitFor(() => expect(screen.getByRole('dialog', { name: 'SERVER_FEIL_ADVARSEL_HEADING' })).toBeVisible());
    expect(postKronisk).toHaveBeenCalledTimes(1);
    expect(router.state.location.pathname).toBe('/nb/kronisk/soknad');
    router.dispose();
  });

  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={initHistory}>
        <ArbeidsgiverProvider arbeidsgivere={testOrganisasjoner} status={HttpStatus.Successfully} baseUrl={''}>
          <h1>h1</h1>
          <h2>h2</h2>
          <KroniskSide />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);

  it('uses the selected PDF for submission and allows deleting it', async () => {
    const user = userEvent.setup();
    const fileContent = `%PDF-1.4\n${'content'.repeat(100)}`;
    const file = new File([fileContent], 'dokumentasjon.pdf', { type: 'application/pdf' });

    render(
      <MemoryRouter initialEntries={initHistory}>
        <ArbeidsgiverProvider arbeidsgivere={testOrganisasjoner} status={HttpStatus.Successfully} baseUrl=''>
          <KroniskSide />
        </ArbeidsgiverProvider>
      </MemoryRouter>
    );

    await user.upload(screen.getByLabelText('KRONISK_SIDE_UPLOAD'), file);
    expect(await screen.findByText('dokumentasjon.pdf')).toBeInTheDocument();

    await user.type(screen.getByLabelText('FODSELSNUMMER_LABEL'), testFnr.GyldigeFraDolly.TestPerson1);
    await user.type(screen.getByRole('textbox', { name: /VIRKSOMHETSNUMMER_LABEL/ }), '315587336');
    await user.click(screen.getByRole('checkbox', { name: 'KRONISK_SIDE_PERIODER_UNNTAK' }));
    await user.click(screen.getByRole('checkbox', { name: 'BEKREFTOPPLYSNINGER_BEKREFT_LABEL' }));
    await user.click(screen.getByRole('button', { name: 'KRONISK_SIDE_SUBMIT' }));

    await waitFor(() =>
      expect(postKronisk).toHaveBeenCalledWith(
        env.baseUrl,
        expect.objectContaining({
          dokumentasjon: `data:application/pdf;base64,${btoa(fileContent)}`
        })
      )
    );

    await user.click(screen.getByRole('button', { name: /slett fil/i }));
    expect(screen.queryByText('dokumentasjon.pdf')).not.toBeInTheDocument();
  });
});
