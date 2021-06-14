import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import GravidKravState from './GravidKravState';
import {
  pushFeilmelding,
  validateBeloep,
  validateFra,
  validateOrgnr,
  isValidFnr,
  validateFnr,
  formatValidation,
  validateTil,
  validateBekreft
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateDager from '../../validation/validateDager';
import { i18n } from 'i18next';
import LangKey from '../../locale/LangKey';

const MAX = 10000000;
const MIN_DATE = new Date(2021, 1, 1);

export const validateGravidKrav = (state: GravidKravState, translate: i18n): GravidKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();
  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  if (nextState.fnrError) {
    pushFeilmelding('ansatteFeilmeldingId', nextState.fnrError, feilmeldinger);
  }
  nextState.orgnrError = formatValidation(validateOrgnr(state.orgnr, state.validated), translate);
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', nextState.orgnrError, feilmeldinger);
  }
  state.perioder?.forEach((periode) => {
    periode.fomError = formatValidation(validateFra(periode.fom, MIN_DATE, !!nextState.validated), translate);
    periode.tomError = formatValidation(
      validateTil(periode.fom, periode.tom, MIN_DATE, !!nextState.validated),
      translate
    );
    periode.dagerError = validateDager(periode.dager, !!nextState.validated);
    periode.beloepError = formatValidation(validateBeloep('' + periode.beloep, MAX, !!nextState.validated), translate);

    if (periode.fomError) {
      pushFeilmelding('fra-dato-' + periode.uniqueKey, periode.fomError, feilmeldinger);
    }

    if (periode.tomError) {
      pushFeilmelding('til-dato-' + periode.uniqueKey, periode.tomError, feilmeldinger);
    }

    if (periode.dagerError) {
      pushFeilmelding('dager-' + periode.uniqueKey, periode.dagerError, feilmeldinger);
    }

    if (periode.beloepError) {
      pushFeilmelding('belop-' + periode.uniqueKey, periode.beloepError, feilmeldinger);
    }
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
