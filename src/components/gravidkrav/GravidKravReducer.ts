import { Actions, GravidKravAction } from './Actions';
import { validateGravidKrav } from './validateGravidKrav';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { parseDateTilDato } from '../../utils/dato/Dato';
import mapResponse from '../../state/validation/mapResponse';
import mapGravidKravFeilmeldinger from './mapGravidKravFeilmeldinger';
import setGrunnbeloep from '../kroniskkrav/setGrunnbeloep';
import showKontrollsporsmaalLonn from './showKontrollsporsmaalLonn';
import { i18n } from 'i18next';

const GravidKravReducer = (state: GravidKravState, action: GravidKravAction, translate: i18n): GravidKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Fra:
      if (payload?.fra === undefined) {
        nextState.fra = undefined;
      } else {
        nextState.fra = parseDateTilDato(payload?.fra);
      }
      return validateGravidKrav(nextState, translate);

    case Actions.Til:
      if (payload?.til === undefined) {
        nextState.til = undefined;
      } else {
        nextState.til = parseDateTilDato(payload?.til);
      }
      return validateGravidKrav(nextState, translate);

    case Actions.Dager:
      nextState.dager = payload?.dager;
      return validateGravidKrav(nextState, translate);

    case Actions.Beloep:
      nextState.beloep = payload?.beloep;
      return validateGravidKrav(nextState, translate);

    case Actions.Dokumentasjon:
      nextState.dokumentasjon = payload?.dokumentasjon;
      return validateGravidKrav(nextState, translate);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateGravidKrav(nextState, translate);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateGravidKrav(nextState, translate);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateGravidKrav(nextState, translate);

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateGravidKrav(nextState, translate);
      validatedState.isOpenKontrollsporsmaalLonn = showKontrollsporsmaalLonn(nextState);
      validatedState.submitting = validatedState.feilmeldinger?.length === 0;
      validatedState.progress = validatedState.submitting;
      return validatedState;

    case Actions.HandleResponse:
      if (payload?.response == undefined) {
        throw new Error('Du må spesifisere response');
      }
      nextState.validated = false;
      nextState.progress = false;
      nextState.submitting = false;
      return mapResponse(payload.response, nextState, mapGravidKravFeilmeldinger) as GravidKravState;

    case Actions.OpenKontrollsporsmaalLonn:
      nextState.isOpenKontrollsporsmaalLonn = true;
      return nextState;

    case Actions.CloseKontrollsporsmaalLonn:
      nextState.isOpenKontrollsporsmaalLonn = false;
      return nextState;

    case Actions.Grunnbeloep:
      setGrunnbeloep(payload, nextState);
      return nextState;

    case Actions.KontrollDager:
      nextState.kontrollDager = payload?.kontrollDager;
      return nextState;

    case Actions.Reset:
      return Object.assign({}, defaultGravidKravState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default GravidKravReducer;
