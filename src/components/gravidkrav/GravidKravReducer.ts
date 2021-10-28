import { Actions, GravidKravAction } from './Actions';
import { validateGravidKrav } from './validateGravidKrav';
import GravidKravState, { defaultGravidKravState } from './GravidKravState';
import { parseDateTilDato } from '../../utils/dato/Dato';
import mapResponse from '../../state/validation/mapResponse';
import mapKravFeilmeldinger from '../../validation/mapKravFeilmeldinger';
import { v4 as uuid } from 'uuid';
import { i18n } from 'i18next';

export const MAX_PERIODER = 50;

const checkItemId = (itemId?: string) => {
  if (itemId === undefined) {
    throw new Error('itemId kan ikke være undefined');
  }
};

const GravidKravReducer = (state: GravidKravState, action: GravidKravAction, translate: i18n): GravidKravState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  nextState.perioder = nextState.perioder ? nextState.perioder : [{ uniqueKey: uuid() }];

  switch (action.type) {
    case Actions.Fnr:
      nextState.fnr = payload?.fnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Orgnr:
      nextState.orgnr = payload?.orgnr;
      return validateGravidKrav(nextState, translate);

    case Actions.Fra:
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.fom = payload?.fra
        ? parseDateTilDato(payload.fra)
        : undefined;

      return validateGravidKrav(nextState, translate);

    case Actions.Til:
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.tom = payload?.til
        ? parseDateTilDato(payload.til)
        : undefined;

      return validateGravidKrav(nextState, translate);

    case Actions.Dager:
      checkItemId(payload?.itemId);
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.dager = payload?.dager;

      return validateGravidKrav(nextState, translate);

    case Actions.Beloep:
      checkItemId(payload?.itemId);
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.belop = payload?.belop;

      return validateGravidKrav(nextState, translate);

    case Actions.Sykemeldingsgrad:
      checkItemId(payload?.itemId);
      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.sykemeldingsgrad =
        payload?.sykemeldingsgrad;

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
      return mapResponse(payload.response, nextState, mapKravFeilmeldinger) as GravidKravState;

    case Actions.Grunnbeloep:
      checkItemId(payload?.itemId);

      nextState.perioder.find((periode) => periode.uniqueKey === payload?.itemId)!.grunnbeloep = payload?.grunnbeloep
        ? payload.grunnbeloep
        : undefined;

      return nextState;

    case Actions.antallDager:
      nextState.antallDager = payload?.antallDager;
      return validateGravidKrav(nextState, translate);

    case Actions.Reset:
      return Object.assign({}, defaultGravidKravState());

    case Actions.AddPeriode:
      if (nextState.perioder.length >= MAX_PERIODER) {
        return nextState;
      }
      nextState.perioder.push({
        uniqueKey: uuid()
      });
      return nextState;

    case Actions.DeletePeriode:
      checkItemId(payload?.itemId);
      nextState.perioder = state.perioder?.filter((i) => i.uniqueKey !== payload!!.itemId);
      return validateGravidKrav(nextState, translate);

    case Actions.NotAuthorized:
      nextState.notAuthorized = false;
      return nextState;

    default:
      throw new Error(`Ugyldig action: ${action.type}`);
  }
};

export default GravidKravReducer;
