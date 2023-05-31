import GravidKravState, { GravidKravPeriode } from './GravidKravState';

import validateDager from '../../validation/validateDager';
import { i18n } from 'i18next';
import validateArbeidsdager from '../../validation/validateArbeidsdager';
import { MAX_ARBEIDSDAGER, MIN_ARBEIDSDAGER, MIN_GRAVID_DATO } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import validateSykemeldingsgrad from '../../validation/validateSykemeldingsgrad';
import dayjs from 'dayjs';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
import validateFnr from '../../validation/validateFnr';
import validateOrgnr from '../../validation/validateOrgnr';
import validateFra from '../../validation/validateFra';
import validateTil from '../../validation/validateTil';
import validateBeloep from '../../validation/validateBeloep';
import validateBekreft from '../../validation/validateBekreft';
import antallDagerIArbeidsgiverperiode from '../../utils/antallDagerIArbeidsgiverperiode';
import dagerMellomPerioder from '../../utils/dagerMellomPerioder';

const MAX = 10000000;
const MIN_DATE = MIN_GRAVID_DATO;

export const validateGravidKrav = (state: GravidKravState, translate: i18n): GravidKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger: Array<FeiloppsummeringFeil> = [];
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

  state.perioder?.forEach((arbeidsgiverperiode, index) => {
    const minDato = dayjs(MIN_DATE).format('DD.MM.YYYY');

    arbeidsgiverperiode.perioder.forEach((delperioder) => {
      const valideringFraStatus = validateFra(delperioder.fom, MIN_DATE, !!state.validated);
      const fomError = translate.t(valideringFraStatus?.key as any, { value: minDato });
      delperioder.fomError = fomError;

      const valideringTilStatus = validateTil(delperioder.fom, delperioder.tom, MIN_DATE, !!state.validated);
      const tomError = translate.t(valideringTilStatus?.key as any, { value: minDato });
      delperioder.tomError = tomError;
    });

    arbeidsgiverperiode.dagerError = formatValidation(
      validateDager(arbeidsgiverperiode.dager, !!state.validated),
      translate
    );
    arbeidsgiverperiode.belopError = formatValidation(
      validateBeloep('' + arbeidsgiverperiode.belop, MAX, !!nextState.validated),
      translate
    );

    arbeidsgiverperiode.sykemeldingsgradError = formatValidation(
      validateSykemeldingsgrad(arbeidsgiverperiode.sykemeldingsgrad, !!state.validated),
      translate
    );

    const antallDager = antallDagerIArbeidsgiverperiode(arbeidsgiverperiode.perioder);
    if (antallDager > 16) {
      pushFeilmelding(
        'arbeidsgiverperiode-' + index,
        'Arbeidsgiverperioden kan maksimalt være 16 dager.',
        feilmeldinger
      );
    }

    fyllPeriodeFeilmeldingsboks(arbeidsgiverperiode, index, feilmeldinger);
  });

  const mellomDager = dagerMellomPerioder(state.perioder);

  if (mellomDager) {
    mellomDager.forEach((dager, index) => {
      if (dager < 16) {
        pushFeilmelding(
          'arbeidsgiverperiode-' + index,
          'Det må være minst 16 dager mellom arbeidsgiverperiodene.',
          feilmeldinger
        );
      }
    });
  }

  nextState.bekreftError = formatValidation(validateBekreft(state.bekreft, state.validated), translate);
  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', nextState.bekreftError || '', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;

  return nextState;
};

const fyllPeriodeFeilmeldingsboks = (
  periode: GravidKravPeriode,
  index: number,
  feilmeldinger: FeiloppsummeringFeil[]
) => {
  periode.perioder.forEach((delperiode) => {
    if (delperiode.fomError) {
      pushFeilmelding(`fra-dato-${index}`, delperiode.fomError, feilmeldinger);
    }

    if (delperiode.tomError) {
      pushFeilmelding(`til-dato-${index}`, delperiode.tomError, feilmeldinger);
    }
  });

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
