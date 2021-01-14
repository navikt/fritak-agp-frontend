import KroniskState from './KroniskState';
import { validateOrgnr } from '../validation/validateOrgnr';
import isValidOrgnr from '../../utils/isValidOrgnr';
import isValidFnr from '../../utils/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { PaakjenningerType } from './PaakjenningerType';
import { validerFravaerTabell } from './validerFravaerTabell';
import { validateFnr } from '../validation/validateFnr';

export const validateKronisk = (state: KroniskState): KroniskState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  nextState.bekreftError = state.bekreft == false ? 'Mangler bekreft' : '';
  nextState.paakjenningerError =
    state.paakjenninger?.length === 0 ? 'Må velge minst ett alternativ' : '';
  nextState.arbeidError =
    state.arbeid?.length === 0 ? 'Må velge minst ett alternativ' : '';

  if (state.orgnr && !isValidOrgnr(state.orgnr)) {
    nextState.orgnrError = 'Ugyldig organisasjonsnummer';
  }

  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = 'Ugyldig fødselsnummer';
  }

  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  if (nextState.fnrError) {
    feilmeldinger.push({
      skjemaelementId: 'fnr',
      feilmelding: 'Fødselsnummer må fylles ut'
    });
  }
  if (nextState.orgnrError) {
    feilmeldinger.push({
      skjemaelementId: 'orgnr',
      feilmelding: 'Organisasjonsnummer må fylles ut'
    });
  }
  if (nextState.arbeidError) {
    feilmeldinger.push({
      skjemaelementId: 'arbeidsutfører',
      feilmelding: 'Arbeid om den ansatte må fylles ut'
    });
  }
  if (nextState.paakjenningerError) {
    feilmeldinger.push({
      skjemaelementId: 'paakjenninger',
      feilmelding: 'Påkjenninger om den ansatte må fylles ut'
    });
  }
  if (state.paakjenninger?.includes(PaakjenningerType.ANNET)) {
    nextState.kommentarError = !nextState.kommentar
      ? 'Kommentar må fylles ut'
      : undefined;
    if (!nextState.kommentar) {
      feilmeldinger.push({
        skjemaelementId: 'paakjenninger',
        feilmelding: 'Kommentar må fylles ut'
      });
    }
  } else {
    nextState.kommentar = '';
    nextState.kommentarError = '';
  }
  nextState.feilmeldinger = feilmeldinger;

  const arbeidFeilmeldinger = validerFravaerTabell(nextState?.fravaer || []);

  if (
    arbeidFeilmeldinger.length == 1 &&
    arbeidFeilmeldinger[0].skjemaelementId == 'fravaer'
  ) {
    nextState.fravaerError = 'Minst en dag må fylles ut';
  } else {
    nextState.fravaerError = undefined;
  }

  nextState.feilmeldinger = nextState.feilmeldinger.concat(arbeidFeilmeldinger);

  if (nextState.bekreftError) {
    nextState.feilmeldinger.push({
      skjemaelementId: 'bekreftFeilmeldingId',
      feilmelding: 'Bekreft at opplysningene er korrekte'
    });
  }
  return nextState;
};
