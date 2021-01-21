import KroniskState from './KroniskState';
import { validateOrgnr } from '../../utils/validateOrgnr';
import isValidOrgnr from '../../utils/isValidOrgnr';
import isValidFnr from '../../utils/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { PaakjenningerType } from './PaakjenningerType';
import { validerFravaerTabell } from './validerFravaerTabell';
import { validateFnr } from '../../utils/validateFnr';
import { MAX_BESKRIVELSE } from './KroniskSide';
import { pushFeilmelding } from '../../utils/pushFeilmelding';

/* eslint complexity: ["off"] */
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
    pushFeilmelding('fnr', 'Fødselsnummer må fylles ut', feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', 'Organisasjonsnummer må fylles ut', feilmeldinger);
  }
  if (nextState.arbeidError) {
    pushFeilmelding(
      'arbeidsutfører',
      'Arbeid om den ansatte må fylles ut',
      feilmeldinger
    );
  }
  if (nextState.paakjenningerError) {
    pushFeilmelding(
      'paakjenninger',
      'Påkjenninger om den ansatte må fylles ut',
      feilmeldinger
    );
  }
  if (state.paakjenninger?.includes(PaakjenningerType.ANNET)) {
    nextState.kommentarError = !nextState.kommentar
      ? 'Kommentar må fylles ut'
      : undefined;
    if (!nextState.kommentar) {
      pushFeilmelding(
        'paakjenninger',
        'Beskrivelsen må fylles ut',
        feilmeldinger
      );
    } else if (nextState?.kommentar?.length > MAX_BESKRIVELSE) {
      nextState.kommentarError = `Beskrivelsen må være mindre enn ${MAX_BESKRIVELSE} tegn`;
      pushFeilmelding(
        'paakjenninger',
        'Beskrivelsen av påkjenningen må være kortere',
        feilmeldinger
      );
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
    pushFeilmelding(
      'bekreftFeilmeldingId',
      'Bekreft at opplysningene er korrekte',
      feilmeldinger
    );
  }
  return nextState;
};
