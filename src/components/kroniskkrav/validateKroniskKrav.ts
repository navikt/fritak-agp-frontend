import KroniskKravState from './KroniskKravState';
import validateDager from '../../validation/validateDager';
import { i18n } from 'i18next';
import validateArbeidsdager from '../../validation/validateArbeidsdager';
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER, MIN_KRONISK_DATO } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import dayjs from 'dayjs';
import validateSykemeldingsgrad from '../../validation/validateSykemeldingsgrad';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
import validateFra from '../../validation/validateFra';
import validateTil from '../../validation/validateTil';
import validateBeloep from '../../validation/validateBeloep';
import validateBekreft from '../../validation/validateBekreft';
import validateOrgnr from '../../validation/validateOrgnr';
import validateFnr from '../../validation/validateFnr';
import textify from '../../utils/textify';

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

  validateEndringsAarsak(nextState, feilmeldinger);

  nextState.perioder?.forEach((arbeidsgiverperiode) => {
    arbeidsgiverperiode.perioder.forEach((aktuellPeriode) => {
      const minDato = dayjs(MIN_DATE).format('DD.MM.YYYY');
      const valideringFraStatus = validateFra(aktuellPeriode.fom, MIN_DATE, !!state.validated);

      aktuellPeriode.fomError = textify(translate.t(valideringFraStatus?.key as string, { value: minDato }));

      const valideringTilStatus = validateTil(aktuellPeriode.fom, aktuellPeriode.tom, MIN_DATE, !!state.validated);

      aktuellPeriode.tomError = textify(translate.t(valideringTilStatus?.key as string, { value: minDato }));
    });
    arbeidsgiverperiode.sykemeldingsgradError = formatValidation(
      validateSykemeldingsgrad(arbeidsgiverperiode.sykemeldingsgrad, !!state.validated),
      translate
    );
    arbeidsgiverperiode.dagerError = formatValidation(
      validateDager(arbeidsgiverperiode.dager, !!state.validated),
      translate
    );
    arbeidsgiverperiode.belopError = formatValidation(
      validateBeloep(stringOrUndefined(arbeidsgiverperiode.belop), MAX, !!state.validated),
      translate
    );
  });

  nextState.perioder?.forEach((arbeidsgiverperiode, apindex) => {
    arbeidsgiverperiode.perioder.forEach((aktuellPeriode, index) => {
      if (aktuellPeriode.fomError) {
        pushFeilmelding(`fra-dato-${apindex}-${index}`, aktuellPeriode.fomError, feilmeldinger);
      }

      if (aktuellPeriode.tomError) {
        pushFeilmelding(`til-dato-${apindex}-${index}`, aktuellPeriode.tomError, feilmeldinger);
      }
    });

    if (arbeidsgiverperiode.dagerError) {
      pushFeilmelding(`dager-${apindex}`, arbeidsgiverperiode.dagerError, feilmeldinger);
    }

    if (arbeidsgiverperiode.belopError) {
      pushFeilmelding(`belop-${apindex}`, arbeidsgiverperiode.belopError, feilmeldinger);
    }

    if (arbeidsgiverperiode.sykemeldingsgradError) {
      pushFeilmelding(`sykemeldingsgrad-${apindex}`, arbeidsgiverperiode.sykemeldingsgradError, feilmeldinger);
    }
  });

  validateBekreftelse(nextState, state, translate, feilmeldinger);

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};

function validateEndringsAarsak(nextState: KroniskKravState, feilmeldinger: FeiloppsummeringFeil[]) {
  if (nextState.endringskrav) {
    if (nextState.endringsAarsak) {
      delete nextState.endringsAarsakError;
    } else {
      nextState.endringsAarsakError = 'Angi årsaken til endringen';
    }
  }

  if (nextState.endringsAarsakError) {
    pushFeilmelding('select-endring-dropdown', nextState.endringsAarsakError, feilmeldinger);
  }
}

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
