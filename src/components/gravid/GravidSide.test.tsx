import React, { FC } from 'react';
import GravidSide from './GravidSide';
import { defaultGravidState } from './GravidState';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';
import '../../mockData/mockWindowLocation';
import { render, screen } from '@testing-library/react';
import LocaleProvider from '../../locale/LocaleProvider';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const AllTheProviders: FC = ({ children }) => {
  return (
    <MemoryRouter>
      <LocaleProvider>{children}</LocaleProvider>
    </MemoryRouter>
  );
};

describe('GravidSide', () => {
  const FODSELSNR = /Fødselsnummer/;
  const VIRKSOMHETSNR = /Virksomhetsnummer/;
  const TILRETTELEGGE = /Har dere prøvd å tilrettelegge arbeidsdagen/;
  const TILTAK = /Hvilke tiltak har dere forsøkt/;
  const VIDERE = /Dere må først ha prøvd å tilrettelegge for den gravide/;
  const OMPLASSERING = /Har dere forsøkt omplassering til en annen jobb/;
  const OMPLASSERING_AARSAK = /Den ansatte ønsker ikke omplassering/;
  const DOKUMENTASJON = /Hvis dere har fått dokumentasjon fra den ansatte/;
  const BEKREFT = /Jeg vet at NAV kan trekke tilbake retten til/;
  const FEILMELDINGER = /For å gå videre må du rette opp følgende:/;
  const SEND_KNAPP = /Send søknad/;
  const STATUS_HOVED = /NAV kan dekke sykepenger i arbeidsgiverperioden/;
  const STATUS_PROGRESS = /Vennligst vent/;
  const STATUS_KVITTERING = /Søknaden er mottatt/;
  const STATUS_FEIL = /Det oppstod en feil/;

  const FNR_ERROR = 'fnrError';
  const ORG_ERROR = 'orgError';
  const BEKREFT_ERROR = 'Bekreft at opplysningene er korrekt';
  const TILTAK_ERROR = 'Du må oppgi minst ett tiltak dere har prøvd';
  const OMPLASSERING_ERROR = 'Velg omplassering';

  afterEach(() => {
    // unmountComponentAtNode(htmlDivElement);
    // htmlDivElement.remove();
    // htmlDivElement = document.createElement('div');
    jest.restoreAllMocks();
    // cleanup();
  });
  it('skal vise progress mens venter på svar', () => {
    const state = defaultGravidState();
    state.progress = true;
    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.getByText(STATUS_PROGRESS)).toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  });

  it('skal vise kvittering', () => {
    const state = defaultGravidState();
    state.kvittering = true;
    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_KVITTERING)).toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  });

  // it('skal vise feil etter innsending', () => {
  //   const state = defaultGravidState();
  //   state.error = true;
  //   render(<GravidSide state={state} />, { wrapper: AllTheProviders });

  //   expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
  //   expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
  //   expect(screen.getByText(STATUS_FEIL)).toBeInTheDocument();
  //   expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  // });

  it('skal vise spørsmål om tilrettelegging', () => {
    const state = defaultGravidState();
    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_HOVED)).toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();

    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING_AARSAK)).not.toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();
    expect(screen.queryByText(DOKUMENTASJON)).not.toBeInTheDocument();
    expect(screen.queryByText(BEKREFT)).not.toBeInTheDocument();
    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
    expect(screen.queryByText(SEND_KNAPP)).not.toBeInTheDocument();
  });

  it('skal vise gå videre når man ikke har klikket for at man har tilrettelagt', () => {
    const state = defaultGravidState();

    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_HOVED)).toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();

    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();
    expect(screen.queryByText(TILTAK)).not.toBeInTheDocument();

    const neiSjekkboks = screen.getByLabelText(/Nei/);

    userEvent.click(neiSjekkboks);

    expect(screen.getByText(VIDERE)).toBeInTheDocument();
    expect(screen.queryByText(TILTAK)).not.toBeInTheDocument();

    expect(screen.queryByText(OMPLASSERING)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING_AARSAK)).not.toBeInTheDocument();
    expect(screen.queryByText(DOKUMENTASJON)).not.toBeInTheDocument();
    expect(screen.queryByText(BEKREFT)).not.toBeInTheDocument();
    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
    expect(screen.queryByText(SEND_KNAPP)).not.toBeInTheDocument();
  });

  it('skal vise ikke tilrettelagt', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    state.videre = true;
    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_HOVED)).toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.queryByText(TILTAK)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING_AARSAK)).not.toBeInTheDocument();

    expect(screen.getByText(VIDERE)).toBeInTheDocument();
    expect(screen.getByText(DOKUMENTASJON)).toBeInTheDocument();
    expect(screen.getByText(BEKREFT)).toBeInTheDocument();
    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
    expect(screen.getByText(SEND_KNAPP)).toBeInTheDocument();
  });

  it('skal vise tilrettelegging', () => {
    const state = defaultGravidState();
    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    const jaSjekkboks = screen.getByLabelText(/Ja/);

    userEvent.click(jaSjekkboks);

    expect(screen.getByText(TILTAK)).toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();

    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.getByText(TILTAK)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING_AARSAK)).toBeInTheDocument();
    expect(screen.getByText(DOKUMENTASJON)).toBeInTheDocument();
    expect(screen.getByText(BEKREFT)).toBeInTheDocument();
    expect(screen.getByText(SEND_KNAPP)).toBeInTheDocument();

    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
  });

  it('skal vise valideringfeil for tilrettelagt', () => {
    const state = defaultGravidState();
    // state.tilrettelegge = true;
    // state.submitting = true;
    // state.validated = true;
    // state.fnrError = FNR_ERROR;
    state.orgnrError = ORG_ERROR;
    state.tiltakError = TILTAK_ERROR;
    state.omplasseringError = OMPLASSERING_ERROR;
    state.bekreftError = BEKREFT_ERROR;

    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    const jaSjekkboks = screen.getByLabelText(/Ja/);
    userEvent.click(jaSjekkboks);

    const submitKnapp = screen.getByText(/Send søknad/);
    userEvent.click(submitKnapp);

    expect(screen.getByText(/Mangler fødselsnummer/)).toBeInTheDocument();
    expect(screen.getByText(/Fødselsnummer må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler virksomhetsnummer/)).toBeInTheDocument();
    expect(screen.getByText(/Virksomhetsnummer må fylles ut/)).toBeInTheDocument();
    expect(screen.getByText(/Du må oppgi minst ett tiltak dere har prøvd/)).toBeInTheDocument();
    expect(screen.getByText(/Spesifiser hvilke tiltak som er forsøkt/)).toBeInTheDocument();
    expect(screen.getAllByText(/Velg omplassering/).length).toBe(2);
    expect(screen.getAllByText(/Bekreft at opplysningene er korrekt/).length).toBe(2);
  });

  it('skal vise valideringfeil ikke tilrettelagt', () => {
    const state = defaultGravidState();
    // state.tilrettelegge = false;
    // state.validated = true;
    // state.submitting = true;
    // state.videre = true;
    state.fnrError = FNR_ERROR;
    state.orgnrError = ORG_ERROR;
    state.bekreftError = BEKREFT_ERROR;
    state.feilmeldinger = [lagFeil('', '')];

    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    const neiSjekkboks = screen.getByLabelText(/Nei/);
    userEvent.click(neiSjekkboks);

    const videreKnapp = screen.getByText(/gå videre med søknaden/);
    userEvent.click(videreKnapp);

    const submitKnapp = screen.getByText(/Send søknad/);
    userEvent.click(submitKnapp);

    render(<GravidSide state={state} />, { wrapper: AllTheProviders });

    expect(screen.getByText(FNR_ERROR)).toBeInTheDocument();
    expect(screen.getByText(ORG_ERROR)).toBeInTheDocument();
    expect(screen.getAllByText(BEKREFT_ERROR).length).toBe(2);
  });
});
