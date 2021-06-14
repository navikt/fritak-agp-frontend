import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import KroniskKrav from './KroniskKrav';
import { MemoryRouter } from 'react-router-dom';
import { ArbeidsgiverProvider, LanguageProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import testFnr from '../../mockData/testFnr';
import testOrganisasjon from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import Locales from '../../locale/Locales';

const arbeidsgivere: Organisasjon[] = testOrganisasjon;
jest.unmock('react-i18next');

describe('KroniskKrav', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider languages={['nb']} i18n={i18next} bundle={Locales}>
          <ArbeidsgiverProvider baseUrl='/base/url'>
            <KroniskKrav />
          </ArbeidsgiverProvider>
        </LanguageProvider>
      </MemoryRouter>
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

    submitButton.click();

    expect(screen.getByText(/Mangler fødselsnummer/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler fra dato/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler til dato/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler dager/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler beløp/)).toBeInTheDocument();
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);

    expect(screen.getByText(/Fødselsnummer må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Fra dato må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Til dato må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Dager må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Beløp må fylles ut/)).toBeInTheDocument();
  });

  it('should show warnings when input is missing, and the warning should dissapear when fixed', () => {
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
    const selectDager = screen.queryAllByLabelText(/Antall dager/)[1];
    const BelopInput = screen.queryAllByLabelText(/Beløp/)[1];
    const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    submitButton.click();

    expect(screen.getByText(/Mangler fødselsnummer/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler fra dato/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler til dato/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler dager/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler beløp/)).toBeInTheDocument();
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);

    expect(screen.getByText(/Fødselsnummer må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Fra dato må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Til dato må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Dager må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Beløp må fylles ut/)).toBeInTheDocument();

    userEvent.type(fnrInput, testFnr.GyldigeFraDolly.TestPerson1);
    expect(screen.queryByText(/Mangler fødselsnummer/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fødselsnummer må fylles ut/)).not.toBeInTheDocument();

    userEvent.selectOptions(selectDager, '3');
    expect(screen.queryByText(/Mangler dager/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();

    userEvent.type(BelopInput, '123');
    expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();

    userEvent.click(bekreftCheckbox);
    expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  });
});
