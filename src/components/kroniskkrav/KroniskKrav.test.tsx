import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import KroniskKrav from './KroniskKrav';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import testFnr from '../../mockData/testFnr';
import testOrganisasjon from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import { LanguageProvider } from '../../context/language/LanguageContext';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';
import { vi } from 'vitest';

const arbeidsgivere: Organisasjon[] = testOrganisasjon;
vi.unmock('react-i18next');

describe('KroniskKrav', () => {
  const user = userEvent.setup();

  it('should have no a11y violations', async () => {
    let container: string | Element;
    await act(
      async () =>
        ({ container } = render(
          <MemoryRouter>
            <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
              <ArbeidsgiverProvider baseUrl='/base/url'>
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

  it('should show warnings when input is missing', () => {
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
    const submitButton = screen.getByText(/Send kravet/);

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
    const submitButton = screen.getByText(/Send kravet/);
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
    const submitButton = screen.getByText(/Send kravet/);

    const selectDager = screen.getByLabelText(/Antall dager/, { selector: 'select' });

    await user.click(submitButton);
    await user.selectOptions(selectDager, ['3']);

    await waitFor(() => {
      expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();
    });
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
    const submitButton = screen.getByText(/Send kravet/);

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
    const submitButton = screen.getByText(/Send kravet/);

    const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    await user.click(submitButton);

    await user.click(bekreftCheckbox);
    expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);
});
