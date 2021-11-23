import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import GravidKravState, { Periode } from './GravidKravState';
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
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER, MIN_GRAVID_DATO } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import validateSykemeldingsgrad from '../../validation/validateSykemeldingsgrad';
import dayjs from 'dayjs';

const MAX = 10000000;
const MIN_DATE = MIN_GRAVID_DATO;

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
    const minDato = dayjs(MIN_DATE).format('DD.MM.YYYY');

    const valideringFraStatus = validateFra(periode.fom, MIN_DATE, !!state.validated);
    periode.fomError = translate.t(valideringFraStatus?.key as any, { value: minDato });

    const valideringTilStatus = validateTil(periode.fom, periode.tom, MIN_DATE, !!state.validated);
    periode.tomError = translate.t(valideringTilStatus?.key as any, { value: minDato });

    periode.dagerError = formatValidation(validateDager(periode.dager, !!state.validated), translate);
    periode.belopError = formatValidation(validateBeloep('' + periode.belop, MAX, !!nextState.validated), translate);

    periode.sykemeldingsgradError = formatValidation(
      validateSykemeldingsgrad(periode.sykemeldingsgrad, !!state.validated),
      translate
    );

    fyllPeriodeFeilmeldingsboks(periode, index, feilmeldinger);
  });

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;

  return nextState;
};

const fyllPeriodeFeilmeldingsboks = (periode: Periode, index: number, feilmeldinger: FeiloppsummeringFeil[]) => {
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
};
