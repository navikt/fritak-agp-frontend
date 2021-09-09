import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import KroniskKravState from './KroniskKravState';
import {
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
import formatValidation from '../../utils/formatValidation';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Locales from '../../locale/Locales';

const MAX = 10000000;
const MIN_DATE = new Date(2021, 1, 1);

export const validateKroniskKrav = (state: KroniskKravState, translate: i18n): KroniskKravState => {
  dayjs.extend(customParseFormat);
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
    const minDato = dayjs(MIN_DATE).format('DD.MM.YYYY');
    const valideringFraStatus = validateFra(aktuellPeriode.fom, MIN_DATE, !!state.validated);
    let transString = Locales[valideringFraStatus?.key as any].nb;

    aktuellPeriode.fomError = translate.t(transString, { value: minDato });

    const valideringTilStatus = validateTil(aktuellPeriode.fom, aktuellPeriode.tom, MIN_DATE, !!state.validated);
    debugger;
    transString = Locales[valideringTilStatus?.key as any].nb;

    aktuellPeriode.tomError = translate.t(transString, { value: minDato });

    aktuellPeriode.dagerError = formatValidation(validateDager(aktuellPeriode.dager, !!state.validated), translate);
    aktuellPeriode.belopError = formatValidation(
      validateBeloep(aktuellPeriode.belop ? '' + aktuellPeriode.belop : undefined, MAX, !!state.validated),
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

    if (aktuellPeriode.belopError) {
      pushFeilmelding(`belop-${index}`, aktuellPeriode.belopError, feilmeldinger);
    }
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
