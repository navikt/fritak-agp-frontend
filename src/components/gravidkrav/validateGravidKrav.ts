import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import GravidKravState from './GravidKravState';
import {
  pushFeilmelding,
  validateBeloep,
  validateFra,
  validateOrgnr,
  validateFnr,
  validateTil,
  validateBekreft
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateDager from '../../validation/validateDager';
import { i18n } from 'i18next';
import validateArbeidsdager from '../../validation/validateArbeidsdager';
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import validateSykemeldingsgrad from '../../validation/validateSykemeldingsgrad';

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

  nextState.antallDagerError = formatValidation(
    validateArbeidsdager(state.antallDager, state.validated, MIN_ARBEIDSDAGER, MAX_ARBEIDSDAGER),
    translate
  );

  if (nextState.antallDagerError) {
    pushFeilmelding('kontrollsporsmaal-lonn-arbeidsdager', nextState.antallDagerError, feilmeldinger);
  }

  state.perioder?.forEach((periode, index) => {
    periode.fomError = formatValidation(validateFra(periode.fom, MIN_DATE, !!nextState.validated), translate);
    periode.tomError = formatValidation(
      validateTil(periode.fom, periode.tom, MIN_DATE, !!nextState.validated),
      translate
    );
    periode.dagerError = formatValidation(validateDager(periode.dager, !!state.validated), translate);
    periode.belopError = formatValidation(validateBeloep('' + periode.belop, MAX, !!nextState.validated), translate);

    periode.sykemeldingsgradError = formatValidation(
      validateSykemeldingsgrad(periode.sykemeldingsgrad, !!state.validated),
      translate
    );

    if (periode.fomError) {
      pushFeilmelding(`fra-dato-${index}`, periode.fomError, feilmeldinger);
    }

    if (periode.tomError) {
      pushFeilmelding(`til-dato-${index}`, periode.tomError, feilmeldinger);
    }

    if (periode.dagerError) {
      pushFeilmelding(`dager-${index}`, periode.dagerError, feilmeldinger);
    }

    if (periode.belopError) {
      pushFeilmelding(`belop-${index}`, periode.belopError, feilmeldinger);
    }

    if (periode.sykemeldingsgradError) {
      pushFeilmelding(`sykemeldingsgrad-${index}`, periode.sykemeldingsgradError, feilmeldinger);
    }
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;

  return nextState;
};
