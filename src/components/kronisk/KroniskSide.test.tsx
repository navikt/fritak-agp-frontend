import React from 'react';
import KroniskSide from './KroniskSide';
import { axe } from 'vitest-axe';
import { MemoryRouter } from 'react-router-dom';
import testOrganisasjoner from '../../mockData/testOrganisasjoner';
import '../../mockData/mockWindowLocation';
import { render, screen, waitFor } from '@testing-library/react';
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
