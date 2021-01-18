import { validateOrgnr } from '../../utils/validateOrgnr';
import isValidOrgnr from '../../utils/isValidOrgnr';
import isValidFnr from '../../utils/isValidFnr';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateFnr } from '../../utils/validateFnr';
import GravidState from './GravidState';

export const validateGravid = (state: GravidState): GravidState => {
  if (!state.validated) {
    return state;
  }
  const nextState = Object.assign({}, state);
  nextState.fnrError = validateFnr(state.fnr, state.validated);
  nextState.orgnrError = validateOrgnr(state.orgnr, state.validated);
  nextState.bekreftError = state.bekreft == false ? 'Mangler bekreft' : '';
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

  if (!state.videre) {
    if (nextState.tilrettelegge == undefined) {
      feilmeldinger.push({
        skjemaelementId: 'tilretteleggeFeilmeldingId',
        feilmelding: 'Spesifiser om dere har tilrettelagt arbeidsdagen'
      });
    }

    if (nextState.tiltak == undefined) {
      nextState.tiltakError = 'Du må oppgi minst ett tiltak dere har prøvd';
      feilmeldinger.push({
        skjemaelementId: 'tiltakFeilmeldingId',
        feilmelding: 'Spesifiser hvilke tiltak som er forsøkt'
      });
    } else {
      // if (nextState.tiltak.includes(Tiltak.ANNET) && !nextState.tiltakBeskrivelse) {
      //   feilmeldinger.push({
      //     skjemaelementId: 'tiltakFeilmeldingId',
      //     feilmelding: 'Du må oppgi minst ett tiltak dere har prøvd'
      //   });
      // }
    }

    if (nextState.omplassering == undefined) {
      nextState.omplasseringError = 'Velg omplassering';
      feilmeldinger.push({
        skjemaelementId: 'omplasseringFeilmeldingId',
        feilmelding: 'Velg omplassering'
      });
    }
  }

  if (!nextState.bekreft) {
    nextState.bekreftError = 'Bekreft at opplysningene er korrekt';
    feilmeldinger.push({
      skjemaelementId: 'bekreftFeilmeldingId',
      feilmelding: 'Bekreft at opplysningene er korrekt'
    });
  }

  nextState.feilmeldinger = feilmeldinger;

  return nextState;
};
