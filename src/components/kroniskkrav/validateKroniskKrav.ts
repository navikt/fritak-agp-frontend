import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import KroniskKravState from './KroniskKravState';
import {
  formatValidation,
  isValidFnr,
  pushFeilmelding,
  validateBekreft,
  validateFnr,
  validateTil
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateFra from '../../validation/validateFra';
import validateDager from '../../validation/validateDager';
import validateBeloep from '../../validation/validateBeloep';
import { validateOrgnr } from '../../validation/validateOrgnr';
import { i18n } from 'i18next';

const MIN_DATE = new Date(2021, 1, 1);

export const validateKroniskKrav = (state: KroniskKravState, translate: i18n): KroniskKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  nextState.bekreftError = !state.bekreft ? 'Mangler bekreft' : '';
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = 'Ugyldig fødselsnummer';
  }
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);

  nextState.perioder?.forEach((aktuellPeriode) => {
    aktuellPeriode.fraError = validateFra(aktuellPeriode.fra, !!state.validated);
    aktuellPeriode.tilError = formatValidation(
      validateTil(aktuellPeriode.fra, aktuellPeriode.til, MIN_DATE, !!state.validated),
      translate
    );
    aktuellPeriode.dagerError = validateDager(aktuellPeriode.dager, !!state.validated);
    aktuellPeriode.beloepError = validateBeloep(aktuellPeriode.beloep, !!state.validated);
  });

  if (nextState.fnrError) {
    pushFeilmelding('fnr', nextState.fnrError, feilmeldinger);
  }

  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', nextState.orgnrError, feilmeldinger);
  }

  nextState.perioder?.forEach((aktuellPeriode) => {
    if (aktuellPeriode.fraError) {
      pushFeilmelding('fra', aktuellPeriode.fraError, feilmeldinger);
    }

    if (aktuellPeriode.tilError) {
      pushFeilmelding('til', aktuellPeriode.tilError, feilmeldinger);
    }

    if (aktuellPeriode.dagerError) {
      pushFeilmelding('dager', aktuellPeriode.dagerError, feilmeldinger);
    }

    if (aktuellPeriode.beloepError) {
      pushFeilmelding('beloep', aktuellPeriode.beloepError, feilmeldinger);
    }
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
