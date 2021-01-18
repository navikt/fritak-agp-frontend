import React from 'react';
import GravidSide from './GravidSide';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  cleanup,
  render as renderTestingLibrary,
  screen,
  waitFor
} from '@testing-library/react';
import { defaultGravidState } from './GravidState';
import { lagFeil } from '../lagFeil';

/**
 * TODO
 * dispatch dokumentasjon ved upload
 * dispatch validate ved submit clicked
 * postGravid når validert, progress og submit
 * dispatch handleResponse etter post
 *
 * Vis progress
 * vis kvittering
 * vis feil
 * vis vanlig skjema
 *
 * vis feilmeldinger
 *
 * DEFAULT-visning: fnr, orgnr, (tilrettelegge = undefined)
 * INgen tilrettelegging:  videre (tilrettelegge = nei)
 * INgen tilrettelegging OG videre=true:  videre (tilrettelegge = nei)
 * Tilrettelagt: (tilrettelagt = ja)
 *
 */

const mockHistoryPush = jest.fn();

const actualRouterDom = jest.requireActual('react-router-dom') as any;

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('GravidSide', () => {
  let htmlDivElement: Element = document.createElement('div');

  beforeEach(() => {
    htmlDivElement = document.createElement('div');
    document.body.appendChild(htmlDivElement);
  });

  afterEach(() => {
    unmountComponentAtNode(htmlDivElement);
    htmlDivElement.remove();
    htmlDivElement = document.createElement('div');
    jest.restoreAllMocks();
    cleanup();
  });
  const FODSELSNR = 'Fødselsnummer';
  const ORGANISASJONSNUMMER = 'Organisasjonsnummer';
  const TILRETTELEGGE = 'Har dere prøvd å tilrettelegge arbeidsdagen';
  const TILTAK = 'Hvilke tiltak er forsøkt';
  const VIDERE = 'Dere må først ha prøvd å tilrettelegge for den gravide';
  const OMPLASSERING = 'Har dere forsøkt omplassering til en annen jobb';
  const OMPLASSERING_AARSAK = 'Den ansatte motsetter seg omplassering';
  const DOKUMENTASJON = 'Hvis dere har fått dokumentasjon fra den ansatte';
  const BEKREFT = 'Jeg vet at NAV kan trekke tilbake retten til';
  const FEILMELDINGER = 'For å gå videre må du rette opp følgende:';
  const SEND_KNAPP = 'Send søknad';
  const STATUS_HOVED = 'NAV kan dekke sykepenger i arbeidsgiverperioden';
  const STATUS_PROGRESS = 'Vennligst vent';
  const STATUS_KVITTERING = 'Søknaden er mottatt';
  const STATUS_FEIL = 'Det oppstod en feil';

  const FNR_ERROR = 'fnrError';
  const ORG_ERROR = 'orgError';
  const BEKREFT_ERROR = 'Bekreft at opplysningene er korrekt';
  const TILTAK_ERROR = 'Du må oppgi minst ett tiltak dere har prøvd';
  const OMPLASSERING_ERROR = 'Velg omplassering';

  it('skal vise progress mens venter på svar', () => {
    const state = defaultGravidState();
    state.progress = true;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).not.toContain(STATUS_HOVED);
  });

  it('skal vise kvittering', () => {
    const state = defaultGravidState();
    state.kvittering = true;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).not.toContain(STATUS_HOVED);
  });

  it('skal vise feil etter innsending', () => {
    const state = defaultGravidState();
    state.error = true;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).toContain(STATUS_HOVED);
  });

  it('skal vise spørsmål om tilrettelegging', () => {
    const state = defaultGravidState();
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).toContain(STATUS_HOVED);

    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(ORGANISASJONSNUMMER);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING_AARSAK);
    expect(htmlDivElement.textContent).not.toContain(VIDERE);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(FEILMELDINGER);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  });

  it('skal vise gå videre når man ikke har tilrettelagt', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).toContain(STATUS_HOVED);

    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(ORGANISASJONSNUMMER);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING_AARSAK);
    expect(htmlDivElement.textContent).toContain(VIDERE);
    expect(htmlDivElement.textContent).not.toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).not.toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(FEILMELDINGER);
    expect(htmlDivElement.textContent).not.toContain(SEND_KNAPP);
  });

  it('skal vise ikke tilrettelagt', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    state.videre = true;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).toContain(STATUS_HOVED);

    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(ORGANISASJONSNUMMER);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).not.toContain(TILTAK);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).not.toContain(OMPLASSERING_AARSAK);
    expect(htmlDivElement.textContent).toContain(VIDERE);
    expect(htmlDivElement.textContent).toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(FEILMELDINGER);
    expect(htmlDivElement.textContent).toContain(SEND_KNAPP);
  });

  it('skal vise tilrettelegging', () => {
    const state = defaultGravidState();
    state.tilrettelegge = true;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).not.toContain(STATUS_PROGRESS);
    expect(htmlDivElement.textContent).not.toContain(STATUS_KVITTERING);
    expect(htmlDivElement.textContent).not.toContain(STATUS_FEIL);
    expect(htmlDivElement.textContent).toContain(STATUS_HOVED);

    expect(htmlDivElement.textContent).toContain(FODSELSNR);
    expect(htmlDivElement.textContent).toContain(ORGANISASJONSNUMMER);
    expect(htmlDivElement.textContent).toContain(TILRETTELEGGE);
    expect(htmlDivElement.textContent).toContain(TILTAK);
    expect(htmlDivElement.textContent).toContain(OMPLASSERING);
    expect(htmlDivElement.textContent).toContain(OMPLASSERING_AARSAK);
    expect(htmlDivElement.textContent).not.toContain(VIDERE);
    expect(htmlDivElement.textContent).toContain(DOKUMENTASJON);
    expect(htmlDivElement.textContent).toContain(BEKREFT);
    expect(htmlDivElement.textContent).not.toContain(FEILMELDINGER);
    expect(htmlDivElement.textContent).toContain(SEND_KNAPP);
  });

  it('skal vise valideringfeil for tilrettelagt', () => {
    const state = defaultGravidState();
    state.tilrettelegge = true;
    state.submitting = true;
    state.validated = true;
    state.fnrError = FNR_ERROR;
    state.orgnrError = ORG_ERROR;
    state.tiltakError = TILTAK_ERROR;
    state.omplasseringError = OMPLASSERING_ERROR;
    state.bekreftError = BEKREFT_ERROR;
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FNR_ERROR);
    expect(htmlDivElement.textContent).toContain(ORG_ERROR);
    expect(htmlDivElement.textContent).toContain(TILTAK_ERROR);
    expect(htmlDivElement.textContent).toContain(OMPLASSERING_ERROR);
    expect(htmlDivElement.textContent).toContain(BEKREFT_ERROR);
  });

  it('skal vise valideringfeil ikke tilrettelagt', () => {
    const state = defaultGravidState();
    state.tilrettelegge = false;
    state.validated = true;
    state.submitting = true;
    state.videre = true;
    state.fnrError = FNR_ERROR;
    state.orgnrError = ORG_ERROR;
    state.bekreftError = BEKREFT_ERROR;
    state.feilmeldinger = [lagFeil('', '')];
    render(<GravidSide state={state} />, htmlDivElement);
    expect(htmlDivElement.textContent).toContain(FNR_ERROR);
    expect(htmlDivElement.textContent).toContain(ORG_ERROR);
    expect(htmlDivElement.textContent).toContain(BEKREFT_ERROR);
  });
});
