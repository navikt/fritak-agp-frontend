import isValidFnr from '../../validation/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../validation/validateFnr';
import GravidKravState from './GravidKravState';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
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
  return nextState;

  // const feilmeldinger = new Array<FeiloppsummeringFeil>();

  // nextState.fnrError = validateFnr(state.fnr, state.validated);
  // nextState.bekreftError = state.bekreft == false ? translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_MANGLER) : '';
  // if (state.fnr && !isValidFnr(state.fnr)) {
  //   nextState.fnrError = translate.t(LangKey.GRAVID_KRAV_VALIDERING_FNR_UGYLDIG);
  // }
  // nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  // nextState.fraError = validateFra(state.fra, state.validated);
  // nextState.tilError = validateTil(state.fra, state.til, state.validated);
  // nextState.dagerError = validateDager(state.dager, state.validated);
  // nextState.beloepError = validateBeloep(state.beloep, state.validated);

  // if (nextState.fnrError) {
  //   pushFeilmelding('fnr', translate.t(LangKey.GRAVID_KRAV_VALIDERING_FNR_MANGLER), feilmeldinger);
  // }

  // if (nextState.orgnrError) {
  //   pushFeilmelding('orgnr', translate.t(LangKey.GRAVID_KRAV_VALIDERING_VIRKSOMHETSNR_MANGLER), feilmeldinger);
  // }

  // if (nextState.fraError) {
  //   pushFeilmelding('fra', translate.t(LangKey.GRAVID_KRAV_VALIDERING_DATO_FRA_MANGLER), feilmeldinger);
  // }

  // if (nextState.tilError) {
  //   pushFeilmelding('til', !!nextState.tilError ? nextState.tilError : translate.t(LangKey.GRAVID_KRAV_VALIDERING_DATO_TIL_MANGLER), feilmeldinger);
  // }

  // if (nextState.dagerError) {
  //   pushFeilmelding('dager', translate.t(LangKey.GRAVID_KRAV_VALIDERING_DAGER_MANGLER), feilmeldinger);
  // }

  // if (nextState.beloepError) {
  //   pushFeilmelding('beloep', translate.t(LangKey.GRAVID_KRAV_VALIDERING_BELOP_MANGLER), feilmeldinger);
  // }

  // if (!nextState.bekreft) {
  //   nextState.bekreftError = translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_KORREKT);
  //   pushFeilmelding('bekreftFeilmeldingId', translate.t(LangKey.GRAVID_KRAV_VALIDERING_BEKREFT_KORREKT), feilmeldinger);
  // }

  // nextState.feilmeldinger = feilmeldinger;
  // return nextState;
};
