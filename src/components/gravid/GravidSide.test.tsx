import React, { FC } from 'react';
import GravidSide from './GravidSide';
import { defaultGravidState } from './GravidState';
import { lagFeil } from '../felles/Feilmeldingspanel/lagFeil';
import '../../mockData/mockWindowLocation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocaleProvider from '../../locale/LocaleProvider';
import { MemoryRouter } from 'react-router';

jest.mock('nav-frontend-tekstomrade', () => {
  return {
    __esModule: true,
    BoldRule: true,
    LinebreakRule: true,
    HighlightRule: true,
    default: ({children}) => {
      return <div>{children}</div>;
    },
  };
});

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        t: (str) => str,
      },
    };
  },
}));

describe('GravidSide', () => {
  const FODSELSNR = /FODSELSNUMMER_LABEL/;
  const VIRKSOMHETSNR = /VIRKSOMHETSNUMMER_LABEL/;
  const TILRETTELEGGE = /GRAVID_SIDE_TILRETTELEGGING/;
  const GRAVID_SIDE_TILTAK_TITTEL = /GRAVID_SIDE_TILTAK_TITTEL/;
  const VIDERE = /GRAVID_SIDE_IKKE_KOMPLETT_1/;
  const OMPLASSERING = /GRAVID_SIDE_OMPLASSERING_TITTEL/;
  const OMPLASSERING_AARSAK = /GRAVID_SIDE_OMPLASSERING_MOTSETTER_SEG/;
  const DOKUMENTASJON = /GRAVID_SIDE_DOKUMENTASJON_TITTEL/;
  const BEKREFT = /BEKREFT_OPPLYSNINGER_BESKRIVELSE/;
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
    render(<GravidSide state={state} />);

    expect(screen.getByText(STATUS_PROGRESS)).toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  });

  it('skal vise kvittering', () => {
    const state = defaultGravidState();
    state.kvittering = true;
    render(<GravidSide state={state} />);

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_KVITTERING)).toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_HOVED)).not.toBeInTheDocument();
  });

  it('skal vise spørsmål om tilrettelegging', () => {
    const state = defaultGravidState();
    render(<GravidSide state={state} />);

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

    render(<GravidSide state={state} />);

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_HOVED)).toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();

    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();
    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();

    const neiSjekkboks = screen.getByLabelText(/NEI/);

    userEvent.click(neiSjekkboks);

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
    render(<GravidSide state={state} />);

    expect(screen.queryByText(STATUS_PROGRESS)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_KVITTERING)).not.toBeInTheDocument();
    expect(screen.queryByText(STATUS_FEIL)).not.toBeInTheDocument();
    expect(screen.getByText(STATUS_HOVED)).toBeInTheDocument();

    expect(screen.getByText(FODSELSNR)).toBeInTheDocument();
    expect(screen.getByText(VIRKSOMHETSNR)).toBeInTheDocument();
    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();
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
    render(<GravidSide state={state} />);

    expect(screen.queryByText(GRAVID_SIDE_TILTAK_TITTEL)).not.toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();

    const jaSjekkboks = screen.getByLabelText(/JA/);
    userEvent.click(jaSjekkboks);

    expect(screen.getByText(GRAVID_SIDE_TILTAK_TITTEL)).toBeInTheDocument();
    expect(screen.queryByText(VIDERE)).not.toBeInTheDocument();

    expect(screen.getByText(TILRETTELEGGE)).toBeInTheDocument();
    expect(screen.getByText(GRAVID_SIDE_TILTAK_TITTEL)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING)).toBeInTheDocument();
    expect(screen.getByText(OMPLASSERING_AARSAK)).toBeInTheDocument();
    expect(screen.getByText(DOKUMENTASJON)).toBeInTheDocument();
    expect(screen.getByText(BEKREFT)).toBeInTheDocument();
    expect(screen.getByText(SEND_KNAPP)).toBeInTheDocument();

    expect(screen.queryByText(FEILMELDINGER)).not.toBeInTheDocument();
  });

  it('skal vise valideringfeil for tilrettelagt', () => {
    const state = defaultGravidState();

    state.orgnrError = ORG_ERROR;
    state.tiltakError = TILTAK_ERROR;
    state.omplasseringError = OMPLASSERING_ERROR;
    state.bekreftError = BEKREFT_ERROR;


    render(<GravidSide state={state} />);

    const jaSjekkboks = screen.getByLabelText(/JA/);
    userEvent.click(jaSjekkboks);

    const submitKnapp = screen.getByText(/GRAVID_SIDE_SEND_SOKNAD/);
    userEvent.click(submitKnapp);


    expect(screen.getByText(/Mangler fødselsnummer/)).toBeInTheDocument();
    expect(screen.getByText(/GRAVID_VALIDERING_MANGLER_FODSELSNUMMER/)).toBeInTheDocument();
    expect(screen.getByText(/Mangler virksomhetsnummer/)).toBeInTheDocument();
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

    render(<GravidSide state={state} />);

    const neiSjekkboks = screen.getByLabelText(/NEI/);
    userEvent.click(neiSjekkboks);

    const videreKnapp = screen.getByText(/GRAVID_SIDE_IKKE_KOMPLETT_2/);
    userEvent.click(videreKnapp);

    const submitKnapp = screen.getByText(/GRAVID_SIDE_SEND_SOKNAD/);
    userEvent.click(submitKnapp);

    render(<GravidSide state={state} />);

    expect(screen.getByText(FNR_ERROR)).toBeInTheDocument();
    expect(screen.getByText(ORG_ERROR)).toBeInTheDocument();
    expect(screen.getAllByText(/GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT/).length).toBe(2);
  });
});
