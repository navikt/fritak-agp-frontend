import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import KroniskKravState from './KroniskKravState';
import {
  formatValidation,
  validateBeloep,
  validateFra,
  validateOrgnr,
  pushFeilmelding,
  validateBekreft,
  validateFnr,
  validateTil
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateDager from '../../validation/validateDager';
import { i18n } from 'i18next';
import validateArbeidsdager from '../../validation/validateArbeidsdager';
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER } from '../../config/konstanter';

const MAX = 10000000;
const MIN_DATE = new Date(2021, 1, 1);

export const validateKroniskKrav = (state: KroniskKravState, translate: i18n): KroniskKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  nextState.orgnrError = formatValidation(validateOrgnr(state.orgnr, state.validated), translate);

  nextState.antallDagerError = formatValidation(
    validateArbeidsdager(state.antallDager, state.validated, MIN_ARBEIDSDAGER, MAX_ARBEIDSDAGER),
    translate
  );

  nextState.perioder?.forEach((aktuellPeriode) => {
    aktuellPeriode.fomError = formatValidation(validateFra(aktuellPeriode.fom, MIN_DATE, !!state.validated), translate);
    aktuellPeriode.tomError = formatValidation(
      validateTil(aktuellPeriode.fom, aktuellPeriode.tom, MIN_DATE, !!state.validated),
      translate
    );
    aktuellPeriode.dagerError = formatValidation(validateDager(aktuellPeriode.dager, !!state.validated), translate);
    aktuellPeriode.beloepError = formatValidation(
      validateBeloep(aktuellPeriode.beloep ? '' + aktuellPeriode.beloep : undefined, MAX, !!state.validated),
      translate
    );
  });

  if (nextState.fnrError) {
    pushFeilmelding('fnr', nextState.fnrError, feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', nextState.orgnrError, feilmeldinger);
  }

  if (nextState.antallDagerError) {
    pushFeilmelding('kontrollsporsmaal-lonn-arbeidsdager', nextState.antallDagerError, feilmeldinger);
  }

  nextState.perioder?.forEach((aktuellPeriode, index) => {
    if (aktuellPeriode.fomError) {
      pushFeilmelding(`fra-dato-${index}`, aktuellPeriode.fomError, feilmeldinger);
    }

    if (aktuellPeriode.tomError) {
      pushFeilmelding(`til-dato-${index}`, aktuellPeriode.tomError, feilmeldinger);
    }

    if (aktuellPeriode.dagerError) {
      pushFeilmelding(`dager-${index}`, aktuellPeriode.dagerError, feilmeldinger);
    }

    if (aktuellPeriode.beloepError) {
      pushFeilmelding(`belop-${index}`, aktuellPeriode.beloepError, feilmeldinger);
    }
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
