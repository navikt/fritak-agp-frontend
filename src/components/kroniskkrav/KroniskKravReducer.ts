import { Actions, KroniskKravAction } from './Actions';
import { validateKroniskKrav } from './validateKroniskKrav';
import KroniskKravState, { defaultKroniskKravState } from './KroniskKravState';
import { parseDateTilDato } from '../../utils/Dato';
import mapResponse from '../../api/mapResponse';
import mapKroniskKravFeilmeldinger from './mapKroniskKravFeilmeldinger';
import { v4 as uuid } from 'uuid';
import setGrunnbeloep from './setGrunnbeloep';

const KroniskKravReducer = (state: KroniskKravState, action: KroniskKravAction): KroniskKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  nextState.perioder = nextState.perioder ? nextState.perioder : [{ fra: {}, til: {}, uniqueKey: uuid() }];

  switch (action.type) {
    case Actions.Fnr:
      cancelSubmit(nextState);
      nextState.fnr = payload?.fnr;
      return validateKroniskKrav(nextState);

    case Actions.Orgnr:
      cancelSubmit(nextState);
      nextState.orgnr = payload?.orgnr;
      return validateKroniskKrav(nextState);

    case Actions.Fra:
      cancelSubmit(nextState);
      if (payload?.periode !== undefined) {
        if (payload?.fra === undefined) {
          nextState.perioder[payload.periode].fra = undefined;
        } else {
          nextState.perioder[payload.periode].fra = parseDateTilDato(payload.fra);
        }
      }

      return validateKroniskKrav(nextState);

    case Actions.Til:
      cancelSubmit(nextState);
      if (payload?.periode !== undefined) {
        if (payload?.til === undefined) {
          nextState.perioder[payload.periode].til = undefined;
        } else {
          nextState.perioder[payload.periode].til = parseDateTilDato(payload.til);
        }
      }
      return validateKroniskKrav(nextState);

    case Actions.Dager:
      cancelSubmit(nextState);
      if (payload?.periode !== undefined) {
        nextState.perioder[payload?.periode].dager = payload?.dager;
      }
      return validateKroniskKrav(nextState);

    case Actions.Beloep:
      cancelSubmit(nextState);
      if (payload?.periode !== undefined) {
        nextState.perioder[payload.periode].beloep = payload?.beloep;
      }
      return validateKroniskKrav(nextState);

    case Actions.Bekreft:
      cancelSubmit(nextState);
      nextState.bekreft = payload?.bekreft;
      return validateKroniskKrav(nextState);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateKroniskKrav(nextState);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateKroniskKrav(nextState);

    case Actions.NotAuthorized:
      nextState.notAuthorized = false;
      return nextState;

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateKroniskKrav(nextState);
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
      return mapResponse(payload.response, nextState, mapKroniskKravFeilmeldinger) as KroniskKravState;

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

    case Actions.AddPeriod:
      const key = uuid();
      nextState.perioder = nextState.perioder
        ? [...nextState.perioder, { fra: {}, til: {}, uniqueKey: key }]
        : [{ fra: {}, til: {}, uniqueKey: key }];
      return nextState;

    case Actions.DeletePeriod:
      if (payload?.periode) {
        nextState.perioder.splice(payload?.periode, 1);
      }

      return nextState;

    case Actions.Reset:
      return Object.assign({}, defaultKroniskKravState());

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default KroniskKravReducer;

const cancelSubmit = (state: KroniskKravState) => {
  state.submitting = false;
  return state;
};
