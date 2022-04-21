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
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER, MIN_KRONISK_DATO } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import dayjs from 'dayjs';
import validateSykemeldingsgrad from '../../validation/validateSykemeldingsgrad';

const MAX = 10000000;
const MIN_DATE = MIN_KRONISK_DATO;

export const validateKroniskKrav = (state: KroniskKravState, translate: i18n): KroniskKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  validateFodselsnummer(nextState, state, translate, feilmeldinger);

  validateOrganisasjonsnummer(nextState, state, translate, feilmeldinger);

  validateAntallDager(nextState, state, translate, feilmeldinger);

  if (nextState.endringskrav) {
    if (nextState.endringsAarsak) {
      delete nextState.endringsAarsakError;
    } else {
      nextState.endringsAarsakError = 'Angi årsaken til endringen';
    }
  }

  nextState.perioder?.forEach((aktuellPeriode) => {
    const minDato = dayjs(MIN_DATE).format('DD.MM.YYYY');
    const valideringFraStatus = validateFra(aktuellPeriode.fom, MIN_DATE, !!state.validated);

    aktuellPeriode.fomError = translate.t(valideringFraStatus?.key as string, { value: minDato });

    const valideringTilStatus = validateTil(aktuellPeriode.fom, aktuellPeriode.tom, MIN_DATE, !!state.validated);

    aktuellPeriode.sykemeldingsgradError = formatValidation(
      validateSykemeldingsgrad(aktuellPeriode.sykemeldingsgrad, !!state.validated),
      translate
    );

    aktuellPeriode.tomError = translate.t(valideringTilStatus?.key as string, { value: minDato });

    aktuellPeriode.dagerError = formatValidation(validateDager(aktuellPeriode.dager, !!state.validated), translate);
    aktuellPeriode.belopError = formatValidation(
      validateBeloep(stringOrUndefined(aktuellPeriode.belop), MAX, !!state.validated),
      translate
    );
  });

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

    if (aktuellPeriode.sykemeldingsgradError) {
      pushFeilmelding(`sykemeldingsgrad-${index}`, aktuellPeriode.sykemeldingsgradError, feilmeldinger);
    }
  });

  validateBekreftelse(nextState, state, translate, feilmeldinger);

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};

function validateBekreftelse(
  nextState: KroniskKravState,
  state: KroniskKravState,
  translate: i18n,
  feilmeldinger: FeiloppsummeringFeil[]
) {
  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }
}

function stringOrUndefined(theNumber: number | undefined): string | undefined {
  return theNumber ? theNumber.toString() : undefined;
}

function validateOrganisasjonsnummer(
  nextState: KroniskKravState,
  state: KroniskKravState,
  translate: i18n,
  feilmeldinger: FeiloppsummeringFeil[]
) {
  nextState.orgnrError = formatValidation(validateOrgnr(state.orgnr, state.validated), translate);
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', nextState.orgnrError, feilmeldinger);
  }
}

function validateFodselsnummer(
  nextState: KroniskKravState,
  state: KroniskKravState,
  translate: i18n,
  feilmeldinger: FeiloppsummeringFeil[]
) {
  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  if (nextState.fnrError) {
    pushFeilmelding('fnr', nextState.fnrError, feilmeldinger);
  }
}

function validateAntallDager(
  nextState: KroniskKravState,
  state: KroniskKravState,
  translate: i18n,
  feilmeldinger: FeiloppsummeringFeil[]
) {
  nextState.antallDagerError = formatValidation(
    validateArbeidsdager(state.antallDager, !!state.validated, MIN_ARBEIDSDAGER, MAX_ARBEIDSDAGER),
    translate
  );

  if (nextState.antallDagerError) {
    pushFeilmelding('kontrollsporsmaal-lonn-arbeidsdager', nextState.antallDagerError, feilmeldinger);
  }
}
