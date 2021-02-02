import { Actions, GravidKravAction } from './Actions';
import { validateGravidKrav } from './validateGravidKrav';
import { mapValidationResponse } from './mapValidationResponse';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { parseDateTilDato } from '../../utils/Dato';

const GravidKravReducer = (state: GravidKravState, action: GravidKravAction): GravidKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateGravidKrav(nextState);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateGravidKrav(nextState);

    case Actions.Fra:
      if (payload?.fra === undefined) {
        nextState.til = undefined;
      } else {
        nextState.fra = parseDateTilDato(payload?.fra);
      }
      return validateGravidKrav(nextState);

    case Actions.Til:
      if (payload?.til === undefined) {
        nextState.til = undefined;
      } else {
        nextState.til = parseDateTilDato(payload?.til);
      }
      return validateGravidKrav(nextState);

    case Actions.Dager:
      nextState.dager = payload?.dager;
      return validateGravidKrav(nextState);

    case Actions.Beloep:
      nextState.beloep = payload?.beloep;
      return validateGravidKrav(nextState);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return validateGravidKrav(nextState);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateGravidKrav(nextState);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateGravidKrav(nextState);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateGravidKrav(nextState);

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateGravidKrav(nextState);
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
      return Object.assign({}, defaultGravidKravState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default GravidKravReducer;
