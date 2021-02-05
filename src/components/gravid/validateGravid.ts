import { validateOrgnr } from '../../utils/validateOrgnr';
import isValidOrgnr from '../../utils/isValidOrgnr';
import isValidFnr from '../../utils/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../utils/validateFnr';
import GravidState from './GravidState';
import { Tiltak } from './Tiltak';
import { MAX_TILTAK_BESKRIVELSE } from './GravidSide';
import { pushFeilmelding } from '../../validation/pushFeilmelding';
import { Omplassering } from './Omplassering';

export const validateGravid = (state: GravidState): GravidState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  const feilmeldinger = new Array<FeiloppsummeringFeil>();

  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  nextState.bekreftError = state.bekreft == false ? 'Mangler bekreft' : '';
  if (state.orgnr && !isValidOrgnr(state.orgnr)) {
    nextState.orgnrError = 'Ugyldig virksomhetsnummer';
  }
  if (state.fnr && !isValidFnr(state.fnr)) {
    nextState.fnrError = 'Ugyldig fødselsnummer';
  }

  if (nextState.fnrError) {
    pushFeilmelding('fnr', 'Fødselsnummer må fylles ut', feilmeldinger);
  }
  if (nextState.orgnrError) {
    pushFeilmelding('orgnr', 'Virksomhetsnummeret må fylles ut', feilmeldinger);
  }

  if (!state.videre) {
    if (nextState.tilrettelegge == undefined) {
      pushFeilmelding('tilretteleggeFeilmeldingId', 'Spesifiser om dere har tilrettelagt arbeidsdagen', feilmeldinger);
    }

    if (nextState.tiltak == undefined || nextState.tiltak.length == 0) {
      nextState.tiltakError = 'Du må oppgi minst ett tiltak dere har prøvd';
      pushFeilmelding('tiltakFeilmeldingId', 'Spesifiser hvilke tiltak som er forsøkt', feilmeldinger);
    } else {
      nextState.tiltakError = undefined;
      nextState.tiltakBeskrivelseError = undefined;
      if (nextState.tiltak.includes(Tiltak.ANNET)) {
        if (!nextState.tiltakBeskrivelse) {
          nextState.tiltakError = 'Beskriv hva dere har gjort';
          pushFeilmelding('tiltakFeilmeldingId', 'Du må gi en kort beskrivelse av hva dere har gjort', feilmeldinger);
        } else if (nextState.tiltakBeskrivelse.length > MAX_TILTAK_BESKRIVELSE) {
          nextState.tiltakBeskrivelseError = `Beskrivelsen må være mindre enn ${MAX_TILTAK_BESKRIVELSE} tegn`;
          pushFeilmelding('tiltakFeilmeldingId', 'Du må gi en kort beskrivelse av hva dere har gjort', feilmeldinger);
        }
      }
    }

    if (nextState.omplassering == undefined) {
      nextState.omplasseringError = 'Velg omplassering';
      pushFeilmelding('omplasseringFeilmeldingId', 'Velg omplassering', feilmeldinger);
    } else if (nextState.omplassering === Omplassering.IKKE_MULIG && nextState.omplasseringAarsak === undefined) {
      nextState.omplasseringError = 'Oppgi årsak';
      pushFeilmelding('omplasseringFeilmeldingId', 'Velg årsak til at omplassering ikke er mulig', feilmeldinger);
    } else {
      nextState.omplasseringError = undefined;
    }
  }

  if (!nextState.bekreft) {
    nextState.bekreftError = 'Bekreft at opplysningene er korrekt';
    pushFeilmelding('bekreftFeilmeldingId', 'Bekreft at opplysningene er korrekt', feilmeldinger);
  }

  nextState.feilmeldinger = feilmeldinger;
  return nextState;
};
