import isValidFnr from '../../validation/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../validation/validateFnr';
import KroniskKravState from './KroniskKravState';
import { pushFeilmelding } from '@navikt/helse-arbeidsgiver-felles-frontend';
import validateFra from '../../validation/validateFra';
import validateTil from '../../validation/validateTil';
import validateDager from '../../validation/validateDager';
import validateBeloep from '../../validation/validateBeloep';
import { validateOrgnr } from '../../validation/validateOrgnr';

export const validateKroniskKrav = (state: KroniskKravState): KroniskKravState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.bekreftError = !state.bekreft ? 'Mangler bekreft' : '';
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = 'Ugyldig fødselsnummer';
  }
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);

  nextState.perioder?.forEach((aktuellPeriode) => {
    aktuellPeriode.fraError = validateFra(aktuellPeriode.fra, !!state.validated);
    aktuellPeriode.tilError = validateTil(aktuellPeriode.fra, aktuellPeriode.til, !!state.validated);
    aktuellPeriode.dagerError = validateDager(aktuellPeriode.dager, !!state.validated);
    aktuellPeriode.beloepError = validateBeloep(aktuellPeriode.beloep, !!state.validated);
  });

  if (nextState.fnrError) {
    pushFeilmelding('fnr', 'Fødselsnummer må fylles ut', feilmeldinger);
  }

  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', 'Virksomhetsnummer må fylles ut', feilmeldinger);
  }

  nextState.perioder?.forEach((aktuellPeriode) => {
    if (aktuellPeriode.fraError) {
      pushFeilmelding('fra', 'Fra dato må fylles ut', feilmeldinger);
    }

    if (aktuellPeriode.tilError) {
      pushFeilmelding('til', 'Til dato må fylles ut', feilmeldinger);
    }

    if (aktuellPeriode.dagerError) {
      pushFeilmelding('dager', 'Dager må fylles ut', feilmeldinger);
    }

    if (aktuellPeriode.beloepError) {
      pushFeilmelding('beloep', 'Beløp må fylles ut', feilmeldinger);
    }
  });

  if (!nextState.bekreft) {
    nextState.bekreftError = 'Bekreft at opplysningene er korrekt';
    pushFeilmelding('bekreftFeilmeldingId', 'Bekreft at opplysningene er korrekt', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
