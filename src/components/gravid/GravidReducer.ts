import GravidState, { defaultGravidState } from './GravidState';
import { Actions, GravidAction } from './Actions';
import { validateGravid } from './validateGravid';
import { mapValidationResponse } from './mapValidationResponse';
import { Omplassering } from './Omplassering';
import { Tiltak } from './Tiltak';

const GravidReducer = (
  state: GravidState,
  action: GravidAction
): GravidState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateGravid(nextState);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateGravid(nextState);

    case Actions.Tilrettelegge:
      nextState.tilrettelegge = payload?.tilrettelegge;
      if (nextState.tilrettelegge) {
        nextState.videre = undefined;
      }
      return validateGravid(nextState);

    case Actions.ToggleTiltak:
      if (payload?.tiltak === undefined) {
        throw new Error('Du må spesifisere tiltak');
      }
      if (!nextState.tiltak) {
        nextState.tiltak = [];
      }
      if (state.tiltak?.includes(payload?.tiltak)) {
        nextState.tiltak.splice(state.tiltak?.indexOf(payload?.tiltak), 1);
      } else {
        nextState.tiltak.push(payload?.tiltak);
      }
      if (!nextState.tiltak || !nextState.tiltak.includes(Tiltak.ANNET)) {
        nextState.tiltakBeskrivelse = undefined;
      }
      return validateGravid(nextState);

    case Actions.TiltakBeskrivelse:
      nextState.tiltakBeskrivelse = payload?.tiltakBeskrivelse;
      return validateGravid(nextState);

    case Actions.OmplasseringForsoek:
      if (payload?.omplasseringForsoek === undefined) {
        throw new Error('Du må spesifisere omplassering');
      }
      nextState.omplassering = payload?.omplasseringForsoek;
      if (nextState.omplassering != Omplassering.IKKE_MULIG) {
        nextState.omplasseringAarsak = undefined;
      }
      return validateGravid(nextState);

    case Actions.OmplasseringAarsak:
      if (payload?.omplasseringAarsak === undefined) {
        throw new Error('Du må spesifisere årsak');
      }
      nextState.omplasseringAarsak = payload?.omplasseringAarsak;
      return validateGravid(nextState);

    case Actions.Videre:
      nextState.videre = payload?.videre;
      return validateGravid(nextState);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return validateGravid(nextState);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateGravid(nextState);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateGravid(nextState);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateGravid(nextState);

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateGravid(nextState);
      validatedState.submitting = validatedState.feilmeldinger?.length === 0;
      validatedState.progress = validatedState.submitting;
      return validatedState;

    case Actions.HandleResponse:
      if (payload?.response == undefined) {
        throw new Error('Du må spesifisere response');
      }
      nextState.submitting = false;
      nextState.progress = false;
      nextState.validated = false;
      return mapValidationResponse(payload.response, nextState);

    case Actions.Reset:
      return Object.assign({}, defaultGravidState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default GravidReducer;
