import { Actions, KroniskKravAction } from './Actions';
import { validateKroniskKrav } from './validateKroniskKrav';
import KroniskKravState, { defaultKroniskKravState } from './KroniskKravState';
import { parseDateTilDato } from '../../utils/dato/Dato';
import mapResponse from '../../state/validation/mapResponse';
import mapKroniskKravFeilmeldinger from './mapKroniskKravFeilmeldinger';
import { v4 as uuid } from 'uuid';
import setGrunnbeloep from './setGrunnbeloep';
import { i18n } from 'i18next';

const checkItemId = (itemId?: string) => {
  if (itemId === undefined) {
    throw new Error('itemId kan ikke være undefined');
  }
};

const KroniskKravReducer = (state: KroniskKravState, action: KroniskKravAction, translate: i18n): KroniskKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  nextState.perioder = nextState.perioder ? nextState.perioder : [{ fom: {}, tom: {}, uniqueKey: uuid() }];

  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateKroniskKrav(nextState, translate);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateKroniskKrav(nextState, translate);

    case Actions.Fra:
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.fom = payload?.fom
        ? parseDateTilDato(payload.fom)
        : undefined;

      return validateKroniskKrav(nextState, translate);

    case Actions.Til:
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.tom = payload?.tom
        ? parseDateTilDato(payload.tom)
        : undefined;

      return validateKroniskKrav(nextState, translate);

    case Actions.Dager:
      if (payload?.periode !== undefined) {
        nextState.perioder[payload?.periode].dager = payload?.dager;
      }
      return validateKroniskKrav(nextState, translate);

    case Actions.Beloep:
      if (payload?.periode !== undefined) {
        nextState.perioder[payload.periode].beloep = payload?.beloep;
      }
      return validateKroniskKrav(nextState, translate);

    case Actions.Bekreft:
      nextState.bekreft = payload?.bekreft;
      return validateKroniskKrav(nextState, translate);

    case Actions.Progress:
      nextState.progress = payload?.progress;
      return validateKroniskKrav(nextState, translate);

    case Actions.Kvittering:
      nextState.kvittering = payload?.kvittering;
      return validateKroniskKrav(nextState, translate);

    case Actions.NotAuthorized:
      nextState.notAuthorized = false;
      return nextState;

    case Actions.Validate:
      nextState.validated = true;
      const validatedState = validateKroniskKrav(nextState, translate);
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

    case Actions.Grunnbeloep:
      setGrunnbeloep(payload, nextState);
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.grunnbeloep = payload?.grunnbeloep
        ? payload.grunnbeloep
        : undefined;

      return nextState;

    case Actions.KontrollDager:
      nextState.kontrollDager = payload?.kontrollDager;
      return nextState;

    case Actions.AddPeriod:
      const key = uuid();
      nextState.perioder = nextState.perioder
        ? [...nextState.perioder, { fom: {}, tom: {}, uniqueKey: key }]
        : [{ fom: {}, tom: {}, uniqueKey: key }];
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
