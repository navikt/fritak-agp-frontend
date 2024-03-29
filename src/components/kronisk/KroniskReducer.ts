import KroniskState, { defaultKroniskState } from './KroniskState';
import { Actions, KroniskAction } from './Actions';
import { validateKronisk } from './validateKronisk';
import { validerFravaer } from './validerFravaer';
import mapResponse from '../../state/validation/mapResponse';
import mapKroniskFeilmeldinger from './mapKroniskFeilmeldinger';
import { i18n } from 'i18next';

const KroniskReducer = (state: KroniskState, action: KroniskAction, translate: i18n): KroniskState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateKronisk(nextState, translate);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateKronisk(nextState, translate);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return validateKronisk(nextState, translate);

    case Actions.Fravaer: //
      if (payload?.fravaer == undefined) {
        throw new Error('Du må spesifisere fravær');
      }
      return validerFravaer(payload.fravaer, nextState);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateKronisk(nextState, translate);

    case Actions.AntallPerioder:
      nextState.antallPerioder = payload?.antallPerioder;
      return validateKronisk(nextState, translate);

    case Actions.Progress:
      if (payload?.progress == undefined) {
        throw new Error('Du må spesifisere progress');
      }
      nextState.progress = payload?.progress;
      return validateKronisk(nextState, translate);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateKronisk(nextState, translate);

    case Actions.HideServerError:
      nextState.serverError = false;
      return validateKronisk(nextState, translate);

    case Actions.HideDuplicateSubmissionError:
      nextState.duplicateSubmission = false;
      return validateKronisk(nextState, translate);

    case Actions.Validate: {
      nextState.validated = true;
      const validatedState = validateKronisk(nextState, translate);
      validatedState.submitting = validatedState.feilmeldinger?.length === 0;
      validatedState.progress = validatedState.submitting;
      return validatedState;
    }

    case Actions.HandleResponse:
      if (payload?.response == undefined) {
        throw new Error('Du må spesifisere response');
      }
      nextState.submitting = false;
      nextState.progress = false;
      nextState.validated = false;
      return mapResponse(payload.response, nextState, mapKroniskFeilmeldinger);

    case Actions.NotAuthorized:
      nextState.notAuthorized = false;
      return nextState;

    case Actions.ToggleUnntak:
      nextState.ikkeHistoriskFravaer = !nextState.ikkeHistoriskFravaer;
      return validateKronisk(nextState, translate);

    case Actions.Reset:
      return Object.assign({}, defaultKroniskState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default KroniskReducer;
