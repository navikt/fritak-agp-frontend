import GravidState from './GravidState';
import { Tiltak } from './Tiltak';
import { MAX_TILTAK_BESKRIVELSE } from './GravidSide';

import { Omplassering } from './Omplassering';
import { i18n } from 'i18next';
import validateTermindato from '../../validation/validateTermindato';
import { GravidSideKeys } from './GravidSideKeys';
import formatValidation from '../../utils/formatValidation';
import validateDokumentasjon from '../../validation/validateDokumentasjon';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
import { validateFnr } from '../../validation/validateFnr';
import { validateOrgnr } from '../../validation/validateOrgnr';
import isValidOrgnr from '../../validation/isValidOrgnr';

export const validateGravid = (state: GravidState, translate: i18n): GravidState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  nextState.termindatoError = validateTermindato(
    state.termindato,
    state.validated,
    translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TERMINDATO)
  );
  nextState.orgnrError = formatValidation(validateOrgnr(state.orgnr, state.validated), translate);
  const bekreftError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_BEKREFT);
  nextState.bekreftError = !state.bekreft ? bekreftError : '';
  if (state.orgnr && !isValidOrgnr(state.orgnr)) {
    const orgnrError = translate.t(GravidSideKeys.GRAVID_VALIDERING_UGYLDIG_ORGNR);
    nextState.orgnrError = orgnrError;
  }

  if (nextState.fnrError) {
    pushFeilmelding('fnr', translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_FODSELSNUMMER), feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_VIRKSOMHETSNUMMER), feilmeldinger);
  }

  if (nextState.termindatoError) {
    pushFeilmelding('termindato', translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TERMINDATO), feilmeldinger);
  }

  nextState.dokumentasjonError = formatValidation(validateDokumentasjon(state.dokumentasjon), translate);

  if (nextState.dokumentasjonError) {
    pushFeilmelding('upload', nextState.dokumentasjonError, feilmeldinger);
  }

  if (!state.videre) {
    if (nextState.tilrettelegge == undefined) {
      pushFeilmelding(
        'tilretteleggeFeilmeldingId',
        translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILRETTELEGGING),
        feilmeldinger
      );
    }

    if (nextState.tiltak == undefined || nextState.tiltak.length == 0) {
      const tiltakError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_FEIL);
      nextState.tiltakError = tiltakError;
      pushFeilmelding(
        'tiltakFeilmeldingId',
        translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL),
        feilmeldinger
      );
    } else {
      nextState.tiltakError = undefined;
      nextState.tiltakBeskrivelseError = undefined;
      if (nextState.tiltak.includes(Tiltak.ANNET)) {
        if (!nextState.tiltakBeskrivelse) {
          const tiltakError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_TITTEL);
          nextState.tiltakError = tiltakError;
          pushFeilmelding(
            'tiltakFeilmeldingId',
            translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE),
            feilmeldinger
          );
        } else if (nextState.tiltakBeskrivelse.length > MAX_TILTAK_BESKRIVELSE) {
          const tiltakBeskrivelseError = translate.t(
            GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE_GRENSE,
            {
              maxLengde: MAX_TILTAK_BESKRIVELSE
            }
          );
          nextState.tiltakBeskrivelseError = tiltakBeskrivelseError;
          pushFeilmelding(
            'tiltakFeilmeldingId',
            translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_TILTAK_BESKRIVELSE),
            feilmeldinger
          );
        }
      }
    }

    if (nextState.omplassering == undefined) {
      const omplasseringError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL);
      nextState.omplasseringError = omplasseringError;
      pushFeilmelding(
        'omplasseringFeilmeldingId',
        translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_TITTEL),
        feilmeldinger
      );
    } else if (nextState.omplassering === Omplassering.IKKE_MULIG && nextState.omplasseringAarsak === undefined) {
      const omplasseringError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_ARSAK);
      nextState.omplasseringError = omplasseringError;
      pushFeilmelding(
        'omplasseringFeilmeldingId',
        translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_UMULIG),
        feilmeldinger
      );
    } else {
      nextState.omplasseringError = undefined;
    }
  }

  if (!nextState.bekreft) {
    const bekreftError = translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT);
    nextState.bekreftError = bekreftError;
    pushFeilmelding(
      'bekreftFeilmeldingId',
      translate.t(GravidSideKeys.GRAVID_VALIDERING_MANGLER_OMPLASSERING_BEKREFT),
      feilmeldinger
    );
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
