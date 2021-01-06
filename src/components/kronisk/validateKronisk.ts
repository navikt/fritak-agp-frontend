import KroniskState from './KroniskState';
import { validateOrgnr } from '../validation/validateOrgnr';
import isValidOrgnr from '../gravid/isValidOrgnr';
import isValidFnr from '../gravid/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { PaakjenningerType } from './PaakjenningerType';
import { validerTabell } from './TabellValidator';
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
      skjemaelementId: 'ansatt',
      feilmelding: 'Fødselsnummer må fylles ut'
    });
  }
  if (nextState.orgnrError) {
    feilmeldinger.push({
      skjemaelementId: 'ansatt',
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
  if (state.paakjenninger?.includes(PaakjenningerType.Annet)) {
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

  const arbeidFeilmeldinger = validerTabell(state?.fravaer || []);

  if (
    arbeidFeilmeldinger.length == 1 &&
    arbeidFeilmeldinger[0].feilmelding == 'Må fylles ut'
  ) {
    nextState.fravaerError = 'Må fylles ut';
  } else {
    nextState.fravaerError = undefined;
  }

  nextState.feilmeldinger.concat(arbeidFeilmeldinger);

  if (nextState.bekreftError) {
    nextState.feilmeldinger.push({
      skjemaelementId: 'bekreftFeilmeldingId',
      feilmelding: 'Bekreft at opplysningene er korrekte'
    });
  }
  return nextState;
};
