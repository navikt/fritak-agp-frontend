import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import GravidKravState from './GravidKravState';
import { pushFeilmelding, isValidFnr, validateFnr, formatValidation } from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateFra from '../../validation/validateFra';
import validateTil from '../../validation/validateTil';
import validateDager from '../../validation/validateDager';
import validateBeloep from '../../validation/validateBeloep';
import { validateOrgnr } from '../../validation/validateOrgnr';
import { i18n } from 'i18next';
import LangKey from '../../locale/LangKey';

export const validateGravidKrav = (state: GravidKravState, translate: i18n): GravidKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);

  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);

  nextState.bekreftError = state.bekreft == false ? translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_MANGLER) : '';
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = translate.t(LangKey.GRAVID_KRAV_VALIDERING_FNR_UGYLDIG);
  }

  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);

  if (nextState.fnrError) {
    pushFeilmelding('ansatteFeilmeldingId', translate.t(LangKey.GRAVID_KRAV_VALIDERING_FNR_MANGLER), feilmeldinger);
  }

  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', translate.t(LangKey.GRAVID_KRAV_VALIDERING_VIRKSOMHETSNR_MANGLER), feilmeldinger);
  }

  state.perioder?.forEach((periode) => {
    periode.fomError = validateFra(periode.fom, !!nextState.validated);
    periode.tomError = validateTil(periode.fom, periode.tom, !!nextState.validated);
    periode.dagerError = validateDager(periode.dager, !!nextState.validated);
    periode.beloepError = validateBeloep(periode.beloep, !!nextState.validated);

    if (periode.fomError) {
      pushFeilmelding(
        'fra-dato-' + periode.uniqueKey,
        translate.t(LangKey.GRAVID_KRAV_VALIDERING_DATO_FRA_MANGLER),
        feilmeldinger
      );
    }

    if (periode.tomError) {
      pushFeilmelding(
        'til-dato-' + periode.uniqueKey,
        !!periode.tomError ? periode.tomError : translate.t(LangKey.GRAVID_KRAV_VALIDERING_DATO_TIL_MANGLER),
        feilmeldinger
      );
    }

    if (periode.dagerError) {
      pushFeilmelding(
        'dager-' + periode.uniqueKey,
        translate.t(LangKey.GRAVID_KRAV_VALIDERING_DAGER_MANGLER),
        feilmeldinger
      );
    }

    if (periode.beloepError) {
      pushFeilmelding(
        'belop-' + periode.uniqueKey,
        translate.t(LangKey.GRAVID_KRAV_VALIDERING_BELOP_MANGLER),
        feilmeldinger
      );
    }
  });

  if (!nextState.bekreft) {
    nextState.bekreftError = translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_KORREKT);
    pushFeilmelding('bekreftFeilmeldingId', translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_KORREKT), feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
