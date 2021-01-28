import isValidFnr from '../../utils/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../utils/validateFnr';
import GravidKravState from './GravidKravState';
import { pushFeilmelding } from '../../validation/pushFeilmelding';
import { validateFra } from './validateFra';
import { validateTil } from './validateTil';
import { validateDager } from './validateDager';
import { validateBeloep } from './validateBeloep';
import { validateOrgnr } from '../../utils/validateOrgnr';

export const validateGravidKrav = (state: GravidKravState): GravidKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.bekreftError = state.bekreft == false ? 'Mangler bekreft' : '';
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = 'Ugyldig fødselsnummer';
  }
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  nextState.fraError = validateFra(state.fra, state.validated);
  nextState.tilError = validateTil(state.til, state.fra, state.validated);
  nextState.dagerError = validateDager(state.dager, state.validated);
  nextState.beloepError = validateBeloep(state.beloep, state.validated);

  if (nextState.fnrError) {
    pushFeilmelding('fnr', 'Fødselsnummer må fylles ut', feilmeldinger);
  }

  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', 'Virksomhetsnummer må fylles ut', feilmeldinger);
  }

  if (nextState.fraError) {
    pushFeilmelding('fra', 'Fra dato må fylles ut', feilmeldinger);
  }

  if (nextState.tilError) {
    pushFeilmelding('til', 'Til dato må fylles ut', feilmeldinger);
  }

  if (nextState.dagerError) {
    pushFeilmelding('dager', 'Dager må fylles ut', feilmeldinger);
  }

  if (nextState.beloepError) {
    pushFeilmelding('beloep', 'Beløp må fylles ut', feilmeldinger);
  }

  if (!nextState.bekreft) {
    nextState.bekreftError = 'Bekreft at opplysningene er korrekt';
    pushFeilmelding('bekreftFeilmeldingId', 'Bekreft at opplysningene er korrekt', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
