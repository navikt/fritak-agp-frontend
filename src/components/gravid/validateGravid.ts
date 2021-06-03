import { validateOrgnr } from '../../validation/validateOrgnr';
import isValidOrgnr from '../../validation/isValidOrgnr';
import isValidFnr from '../../validation/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../validation/validateFnr';
import GravidState from './GravidState';
import { Tiltak } from './Tiltak';
import { MAX_TILTAK_BESKRIVELSE } from './GravidSide';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
import { Omplassering } from './Omplassering';
import { i18n } from 'i18next';
import LangKey from '../../locale/LangKey';
import { validateTermindato } from '../../validation/validateTermindato';

export const validateGravid = (state: GravidState, translate: i18n): GravidState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.termindatoError = validateTermindato(state.termindato, state.validated);
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  nextState.bekreftError = state.bekreft ? translate.t(LangKey.GRAVID_VALIDERING_MANGLER_BEKREFT) : '';
  if (state.orgnr && !isValidOrgnr(state.orgnr)) {
    nextState.orgnrError = translate.t(LangKey.GRAVID_VALIDERING_UGYLDIG_ORGNR);
  }
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = translate.t(LangKey.GRAVID_VALIDERING_UGYLDIG_FODSELSNUMER);
  }

  if (nextState.fnrError) {
    pushFeilmelding('fnr', translate.t(LangKey.GRAVID_VALIDERING_MANGLER_FODSELSNUMMER), feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', translate.t(LangKey.GRAVID_VALIDERING_MANGLER_VIRKSOMHETSNUMMER), feilmeldinger);
  }

  if (nextState.termindatoError) {
    pushFeilmelding('termindato', 'Mangler termindato', feilmeldinger);
  }

  if (!state.videre) {
    if (nextState.tilrettelegge == undefined) {
      pushFeilmelding(
        'tilretteleggeFeilmeldingId',
        translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILRETTELEGGING),
        feilmeldinger
      );
    }

    if (nextState.tiltak == undefined || nextState.tiltak.length == 0) {
      nextState.tiltakError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_FEIL);
      pushFeilmelding(
        'tiltakFeilmeldingId',
        translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL),
        feilmeldinger
      );
    } else {
      nextState.tiltakError = undefined;
      nextState.tiltakBeskrivelseError = undefined;
      if (nextState.tiltak.includes(Tiltak.ANNET)) {
        if (!nextState.tiltakBeskrivelse) {
          nextState.tiltakError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL);
          pushFeilmelding(
            'tiltakFeilmeldingId',
            translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE),
            feilmeldinger
          );
        } else if (nextState.tiltakBeskrivelse.length > MAX_TILTAK_BESKRIVELSE) {
          nextState.tiltakBeskrivelseError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE_GRENSE, {
            maxLengde: MAX_TILTAK_BESKRIVELSE
          });
          pushFeilmelding(
            'tiltakFeilmeldingId',
            translate.t(LangKey.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE),
            feilmeldinger
          );
        }
      }
    }

    if (nextState.omplassering == undefined) {
      nextState.omplasseringError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL);
      pushFeilmelding(
        'omplasseringFeilmeldingId',
        translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL),
        feilmeldinger
      );
    } else if (nextState.omplassering === Omplassering.IKKE_MULIG && nextState.omplasseringAarsak === undefined) {
      nextState.omplasseringError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_ARSAK);
      pushFeilmelding(
        'omplasseringFeilmeldingId',
        translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_UMULIG),
        feilmeldinger
      );
    } else {
      nextState.omplasseringError = undefined;
    }
  }

  if (!nextState.bekreft) {
    nextState.bekreftError = translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT);
    pushFeilmelding(
      'bekreftFeilmeldingId',
      translate.t(LangKey.GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT),
      feilmeldinger
    );
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
