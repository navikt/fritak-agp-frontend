import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';

import KroniskKrav from './KroniskKrav';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import testFnr from '../../mockData/testFnr';
import testOrganisasjon from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Locales from '../../locale/Locales';
import buildResources from '../../locale/buildResources';
import { LanguageProvider } from '../../context/language/LanguageContext';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import { vi } from 'vitest';
import { defaultKroniskKravState } from './KroniskKravState';

const arbeidsgivere: Organisasjon[] = testOrganisasjon;
vi.unmock('react-i18next');

describe('KroniskKrav', () => {
  beforeAll(async () => {
    if (!i18next.isInitialized) {
      await i18next.use(initReactI18next).init({
        resources: buildResources(Locales),
        lng: 'nb',
        react: { useSuspense: false }
      });
    }
  });
  const user = userEvent.setup();

  it.each([
    { path: '/nb/kronisk/krav', route: '/:language/kronisk/krav', receipt: '/nb/kronisk/krav/kvittering' },
    { path: '/en/kronisk/krav', route: '/:language/kronisk/krav', receipt: '/en/kronisk/krav/kvittering' },
    { path: '/kronisk/krav', route: '/kronisk/krav', receipt: '/nb/kronisk/krav/kvittering' }
  ])('replaces $path with $receipt after successful submission', async ({ path, route, receipt }) => {
    const consoleError = vi.spyOn(console, 'error');
    const router = createMemoryRouter(
      [
        { path: '/before', element: <div>Before form</div> },
        {
          path: route,
          element: <KroniskKrav state={defaultKroniskKravState({ kvittering: true, feilmeldinger: [] })} />
        },
        { path: receipt, element: <div>Receipt</div> }
      ],
      { initialEntries: ['/before', path], initialIndex: 1 }
    );

    try {
      render(<RouterProvider router={router} />);

      await waitFor(() => expect(router.state.location.pathname).toBe(receipt));
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

  it.each([false, true])('stays on the form with validation errors and serverError=%s', (serverError) => {
    const router = createMemoryRouter(
      [
        {
          path: '/nb/kronisk/krav',
          element: (
            <KroniskKrav
              state={defaultKroniskKravState({
                kvittering: false,
                serverError,
                feilmeldinger: [{ skjemaelementId: 'fnr', feilmelding: 'Test validation error' }]
              })}
            />
          )
        }
      ],
      { initialEntries: ['/nb/kronisk/krav'] }
    );
    render(<RouterProvider router={router} />);

    expect(router.state.historyAction).toBe('POP');
    expect(router.state.location.pathname).toBe('/nb/kronisk/krav');
    router.dispose();
  });

  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
              <ArbeidsgiverProvider baseUrl='/base/url' status={200} arbeidsgivere={arbeidsgivere}>
                <KroniskKrav />
              </ArbeidsgiverProvider>
            </LanguageProvider>
          </MemoryRouter>
        ))
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });

  it('should show warnings when input is missing', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    fireEvent.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);
    expect(screen.getAllByText(/Mangler fra dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler til dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler dager/).length).toBe(2);
    expect(screen.getAllByText(/Mangler beløp/).length).toBe(2);
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);
  });

  it('should show warnings when input is missing, and the warning should disappear when fixed', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);
    const fnrInput = screen.getByLabelText(/Fødselsnummer/);

    await user.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);

    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);

    await user.type(fnrInput, testFnr.GyldigeFraDolly.TestPerson1);
    expect(screen.queryByText(/Mangler fødselsnummer/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fødselsnummer må fylles ut/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should disappear when fixed 2', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const selectDager = screen.getByLabelText(/Antall dager/, { selector: 'select' });

    await user.click(submitButton);
    await user.selectOptions(selectDager, ['3']);

    await waitFor(
      () => {
        expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('should show warnings when input is missing, and the warning should dissapear when fixed 3', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];

    await user.click(submitButton);

    await user.type(BelopInput, '123');
    expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should disappear when fixed 4', async () => {
    render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider
            arbeidsgivere={arbeidsgivere}
            status={200}
            arbeidsgiverId='810007842'
            baseUrl='/base/url'
          >
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
    );
    const submitButton = await screen.findByText(/Send kravet/);

    const bekreftCheckbox = screen.getByRole('checkbox', { name: /Jeg bekrefter at/ });

    await user.click(submitButton);

    await user.click(bekreftCheckbox);
    expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);
});
