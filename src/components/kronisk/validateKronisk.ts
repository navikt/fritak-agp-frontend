import KroniskState from './KroniskState';
import { validerFravaerTabell } from './validerFravaerTabell';
import { i18n } from 'i18next';
import validateAntallPerioder from '../../validation/validateAntallPerioder';
import { MAX_FRAVAERSPERIODER, MIN_FRAVAERSPERIODER } from '../../config/konstanter';
import formatValidation from '../../utils/formatValidation';
import validateDokumentasjon from '../../validation/validateDokumentasjon';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { pushFeilmelding } from '../felles/Feilmeldingspanel/pushFeilmelding';
import { validateFnr } from '../../validation/validateFnr';
import isValidOrgnr from '../../validation/isValidOrgnr';
import { validateOrgnr } from '../../validation/validateOrgnr';

/* eslint complexity: ["off"] */
export const validateKronisk = (state: KroniskState, translate: i18n): KroniskState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  nextState.fnrError = formatValidation(validateFnr(state.fnr, state.validated), translate);
  nextState.orgnrError = formatValidation(validateOrgnr(state.orgnr, state.validated), translate);
  nextState.bekreftError = state.bekreft ? '' : 'Mangler bekreft';

  if (state.orgnr && !isValidOrgnr(state.orgnr)) {
    nextState.orgnrError = 'Ugyldig virksomhetsnummer';
  }

  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  if (nextState.fnrError) {
    pushFeilmelding('fnr', nextState.fnrError, feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', 'Virksomhetsnummer må fylles ut', feilmeldinger);
  }

  nextState.dokumentasjonError = formatValidation(validateDokumentasjon(state.dokumentasjon), translate);

  if (nextState.dokumentasjonError) {
    pushFeilmelding('upload', nextState.dokumentasjonError, feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;

  const arbeidFeilmeldinger = validerFravaerTabell(nextState?.fravaer || [], !!nextState.ikkeHistoriskFravaer);

  nextState.fravaerError = fyllFravaerFeilmeldinger(arbeidFeilmeldinger, nextState);

  nextState.antallPerioderError = formatValidation(
    validateAntallPerioder(
      state.antallPerioder,
      !!nextState.validated,
      !!state.ikkeHistoriskFravaer,
      MIN_FRAVAERSPERIODER,
      MAX_FRAVAERSPERIODER
    ),
    translate
  );
  if (nextState.antallPerioderError) {
    pushFeilmelding('soknad-perioder', nextState.antallPerioderError, feilmeldinger);
  }

  if (nextState.bekreftError) {
    pushFeilmelding('bekreftFeilmeldingId', 'Bekreft at opplysningene er korrekte', feilmeldinger);
  }

  nextState.feilmeldinger = nextState.feilmeldinger.concat(arbeidFeilmeldinger);
  return nextState;
};

function fyllFravaerFeilmeldinger(arbeidFeilmeldinger: FeiloppsummeringFeil[], nextState: KroniskState) {
  if (arbeidFeilmeldinger?.length == 1 && arbeidFeilmeldinger[0].skjemaelementId == '#fravaer') {
    if (nextState.ikkeHistoriskFravaer) {
      return 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.';
    } else {
      return 'Minst en dag må fylles ut.';
    }
  } else {
    return undefined;
  }
}
