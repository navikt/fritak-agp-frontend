import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import KroniskKrav from './KroniskKrav';
import { MemoryRouter } from 'react-router-dom';
import { Organisasjon } from '@navikt/bedriftsmeny';
import testFnr from '../../mockData/testFnr';
import testOrganisasjon from '../../mockData/testOrganisasjoner';
import i18next from 'i18next';
import Locales from '../../locale/Locales';
import { LanguageProvider } from '../../context/language/LanguageContext';
import { ArbeidsgiverProvider } from '../../context/arbeidsgiver/ArbeidsgiverContext';

const arbeidsgivere: Organisasjon[] = testOrganisasjon;
vi.unmock('react-i18next');

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

    fireEvent.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);
    expect(screen.getAllByText(/Mangler fra dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler til dato/).length).toBe(2);
    expect(screen.getAllByText(/Mangler dager/).length).toBe(2);
    expect(screen.getAllByText(/Mangler beløp/).length).toBe(2);
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);
  });

  it('should show warnings when input is missing, and the warning should dissapear when fixed', async () => {
    const user = userEvent.setup();

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
    // const selectDager = screen.getAllByLabelText(/Antall dager/)[1];
    // const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];
    // const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    fireEvent.click(submitButton);

    expect(screen.getAllByText(/Mangler fødselsnummer/).length).toBe(2);
    // expect(await screen.getAllByText(/Mangler fra dato/).length).toBe(2);
    // expect(await screen.getAllByText(/Mangler til dato/).length).toBe(2);
    // expect(await screen.getAllByText(/Mangler dager/).length).toBe(2);
    // expect(await screen.getAllByText(/Mangler beløp/).length).toBe(2);
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);

    await user.type(fnrInput, testFnr.GyldigeFraDolly.TestPerson1);
    expect(screen.queryByText(/Mangler fødselsnummer/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fødselsnummer må fylles ut/)).not.toBeInTheDocument();

    // await user.type(BelopInput, '123');
    // expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();

    // await user.click(bekreftCheckbox);
    // expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should dissapear when fixed 2', async () => {
    // const user = userEvent.setup();

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
    // const fnrInput = screen.getByLabelText(/Fødselsnummer/);
    const selectDager = screen.getByLabelText(/Antall dager/, { selector: 'select' });

    // const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];
    // const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    fireEvent.click(submitButton);
    await fireEvent.change(selectDager, { target: { value: 3 } });
    // await user.selectOptions(selectDager, '3');

    await waitFor(() => {
      expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();
      // expect(screen.queryAllByText(/Mangler dager/)).toHaveLength(0);
    });

    // await user.type(BelopInput, '123');
    // expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();

    // await user.click(bekreftCheckbox);
    // expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  });

  it('should show warnings when input is missing, and the warning should dissapear when fixed 3', async () => {
    const user = userEvent.setup();

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
    // const fnrInput = screen.getByLabelText(/Fødselsnummer/);
    // const selectDager = screen.getAllByLabelText(/Antall dager/)[1];
    const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];
    // const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    fireEvent.click(submitButton);

    // await user.selectOptions(selectDager, '3');
    // expect(screen.queryByText(/Mangler dager/)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();

    await user.type(BelopInput, '123');
    expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();

    // await user.click(bekreftCheckbox);
    // expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);

  it('should show warnings when input is missing, and the warning should dissapear when fixed 4', async () => {
    const user = userEvent.setup();

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
    // const fnrInput = screen.getByLabelText(/Fødselsnummer/);
    // const selectDager = screen.getAllByLabelText(/Antall dager/)[1];
    // const BelopInput = screen.queryAllByLabelText(/Beregnet månedsinntekt/)[1];
    const bekreftCheckbox = screen.getByText(/Jeg bekrefter at/);

    fireEvent.click(submitButton);

    // await user.selectOptions(selectDager, '3');
    // expect(screen.queryByText(/Mangler dager/)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Dager må fylles ut/)).not.toBeInTheDocument();

    // await user.type(BelopInput, '123');
    // expect(screen.queryByText(/Mangler beløp/)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Beløp må fylles ut/)).not.toBeInTheDocument();

    await user.click(bekreftCheckbox);
    expect(screen.queryByText(/Bekreft at opplysningene er korrekt/)).not.toBeInTheDocument();
  }, 10000);
});
