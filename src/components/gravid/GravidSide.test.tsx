import React from 'react';
import GravidSide from './GravidSide';
import { defaultGravidState } from './GravidState';
import '../../mockData/mockWindowLocation';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import testFnr from '../../mockData/testFnr';
import testOrgnr from '../../mockData/testOrgnr';
import { Omplassering } from './Omplassering';
import env from '../../config/environment';
import { vi } from 'vitest';

import lagFeil from '../felles/Feilmeldingspanel/lagFeil';
import { Dato } from '../../utils/dato/Dato';
import { http, HttpResponse } from 'msw';

vi.mock('nav-frontend-tekstomrade', () => {
  return {
    __esModule: true,
    BoldRule: true,
    LinebreakRule: true,
    HighlightRule: true,
    default: ({ children }) => {
      return <span>{children}</span>;
    }
  };
});

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

describe('GravidSide', () => {
  const FODSELSNR = /FODSELSNUMMER_LABEL/;
  const VIRKSOMHETSNR = /VIRKSOMHETSNUMMER_LABEL/;
  const TILRETTELEGGE = /GRAVID_SIDE_TILRETTELEGGING/;
  const GRAVID_SIDE_TILTAK_TITTEL = /GRAVID_SIDE_TILTAK_TITTEL/;
  const VIDERE = /GRAVID_SIDE_IKKE_KOMPLETT_1/;
  const OMPLASSERING = /GRAVID_SIDE_OMPLASSERING_TITTEL/;
  const OMPLASSERING_AARSAK = /GRAVID_SIDE_OMPLASSERING_MOTSETTER_SEG/;
  const DOKUMENTASJON = /GRAVID_SIDE_DOKUMENTASJON_TITTEL/;
  const BEKREFT = /OPPLYSNINGER/;
  const FEILMELDINGER = /For å gå videre må du rette opp følgende:/;
  const SEND_KNAPP = /GRAVID_SIDE_SEND_SOKNAD/;
  const STATUS_HOVED = /GRAVID_SIDE_INGRESS/;
  const STATUS_PROGRESS = /GRAVID_KVITTERING_VENNLIGST_VENT/;
  const STATUS_KVITTERING = /GRAVID_KVITTERING_TITTEL/;
  const STATUS_FEIL = /Det oppstod en feil/;

  const FNR_ERROR = 'fnrError';
  const ORG_ERROR = 'orgError';
  const BEKREFT_ERROR = 'GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT';
  const TILTAK_ERROR = 'Du må oppgi minst ett tiltak dere har prøvd';
  const OMPLASSERING_ERROR = 'Velg omplassering';

  it('skal vise progress mens venter på svar', () => {
    const state = defaultGravidState();
    state.progress = true;
    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    expect(screen.getByText(STATUS_PROGRESS)).toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  });

  it('skal vise spørsmål om tilrettelegging', () => {
    const state = defaultGravidState();
    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();

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

    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();

    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();
    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();

    const neiSjekkboks = screen.getByLabelText(/NEI/);

    fireEvent.click(neiSjekkboks);

    expect(screen.getByText(VIDERE)).toBeInTheDocument();
    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();

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
    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING)).not.toBeInTheDocument();
    expect(screen.queryByText(OMPLASSERING_AARSAK)).not.toBeInTheDocument();

    expect(screen.getByText(VIDERE)).toBeInTheDocument();
    expect(screen.getByText(DOKUMENTASJON)).toBeInTheDocument();

    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
    expect(screen.getByText(SEND_KNAPP)).toBeInTheDocument();
  });

  it('skal vise tilrettelegging', () => {
    const state = defaultGravidState();
    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();

    const jaSjekkboks = screen.getByLabelText(/JA/);
    fireEvent.click(jaSjekkboks);

    expect(screen.getByText(GRAVID_SIDE_TILTAK_TITTEL)).toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();

    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.getByText(GRAVID_SIDE_TILTAK_TITTEL)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING_AARSAK)).toBeInTheDocument();
    expect(screen.getByText(DOKUMENTASJON)).toBeInTheDocument();
    expect(screen.getByText(SEND_KNAPP)).toBeInTheDocument();

    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
  });

  it('skal vise valideringfeil for tilrettelagt', () => {
    const state = defaultGravidState();

    state.orgnrError = ORG_ERROR;
    state.tiltakError = TILTAK_ERROR;
    state.omplasseringError = OMPLASSERING_ERROR;
    state.bekreftError = BEKREFT_ERROR;

    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    const jaSjekkboks = screen.getByLabelText(/JA/);
    fireEvent.click(jaSjekkboks);

    const submitKnapp = screen.getByText(/GRAVID_SIDE_SEND_SOKNAD/);
    fireEvent.click(submitKnapp);

    expect(screen.getByText(/VALIDATE_FNR_MISSING/)).toBeInTheDocument();
    expect(screen.getByText(/GRAVID_VALIDERING_MANGLER_FODSELSNUMMER/)).toBeInTheDocument();
    expect(screen.getByText(/VALIDATE_ORGNR_MISSSING/)).toBeInTheDocument();
    expect(screen.getByText(/GRAVID_VALIDERING_MANGLER_VIRKSOMHETSNUMMER/)).toBeInTheDocument();
    expect(screen.getByText(/GRAVID_VALIDERING_MANGLER_TILTAK_FEIL/)).toBeInTheDocument();
    expect(screen.getByText(/GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL/)).toBeInTheDocument();
    expect(screen.getAllByText(/GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL/).length).toBe(2);
    expect(screen.getAllByText(/GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT/).length).toBe(2);
  });

  it('skal vise valideringfeil ikke tilrettelagt', () => {
    const state = defaultGravidState();

    state.fnrError = FNR_ERROR;
    state.orgnrError = ORG_ERROR;
    state.bekreftError = BEKREFT_ERROR;
    state.feilmeldinger = [lagFeil('', '')];

    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    const neiSjekkboks = screen.getByLabelText(/NEI/);
    fireEvent.click(neiSjekkboks);

    const videreKnapp = screen.getByText(/GRAVID_SIDE_IKKE_KOMPLETT_2/);
    fireEvent.click(videreKnapp);

    const submitKnapp = screen.getByText(/GRAVID_SIDE_SEND_SOKNAD/);
    fireEvent.click(submitKnapp);

    expect(screen.getByText('VALIDATE_FNR_MISSING')).toBeInTheDocument();
    expect(screen.getByText('VALIDATE_ORGNR_MISSSING')).toBeInTheDocument();
    expect(screen.getAllByText(/GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT/).length).toBe(2);
  });

  it('skal beholde feltverdier ved valideringsfeil fra backend', async () => {
    const state = defaultGravidState();

    const termindato: Dato = {
      day: 1,
      month: 5,
      year: 2021,
      value: '01.05.2021'
    };

    state.orgnr = testOrgnr.GyldigeOrgnr.TestOrg1;
    state.fnr = testFnr.GyldigeFraDolly.TestPerson1;
    state.omplassering = Omplassering.JA;
    state.bekreft = true;
    state.termindato = termindato;

    // @ts-ignore
    window.location = new URL('https://www.dev.nav.no');

    http.post('https://fritakagp.dev.nav.no/api/v1/gravid/soeknad', () => {
      return new HttpResponse(null, { status: 401 });
    });

    render(
      <MemoryRouter>
        <GravidSide state={state} />{' '}
      </MemoryRouter>
    );

    const jaSjekkboks = screen.getAllByLabelText(/JA/);
    fireEvent.click(jaSjekkboks[0]);

    const tilrettelagtRadioUsjekket = screen.getByLabelText(/GRAVID_SIDE_TILTAK_HJEMMEKONTOR/);
    expect(tilrettelagtRadioUsjekket).not.toBeChecked();
    fireEvent.click(tilrettelagtRadioUsjekket);
    expect(tilrettelagtRadioUsjekket).toBeChecked();

    const submitKnapp = await screen.findByText(/GRAVID_SIDE_SEND_SOKNAD/);
    submitKnapp.click();

    const tilrettelagtRadio = await screen.findByLabelText(/GRAVID_SIDE_TILTAK_HJEMMEKONTOR/);
    expect(tilrettelagtRadio).toBeChecked();
  });
});
