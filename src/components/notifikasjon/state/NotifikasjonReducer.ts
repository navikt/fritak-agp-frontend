import { defaultNotifikasjonState, NotifikasjonState } from './NotifikasjonState';
import { NotifikasjonAction } from './NotifikasjonAction';
import Actions from './Actions';
import NotifikasjonType from '../felles/NotifikasjonType';
import GravidSoknadResponse from '../../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';
import KroniskSoknadResponse from '../../../api/kronisk/KroniskSoknadResponse';

const isKroniskSoknadResponse = (value: unknown): value is KroniskSoknadResponse => {
  return !!value && typeof value === 'object';
};

const isKroniskKravResponse = (value: unknown): value is KroniskKravResponse => {
  return !!value && typeof value === 'object';
};

const isGravidKravResponse = (value: unknown): value is GravidKravResponse => {
  return !!value && typeof value === 'object';
};

const isGravidSoknadResponse = (value: unknown): value is GravidSoknadResponse => {
  return !!value && typeof value === 'object';
};

const NotifikasjonReducer = (state: NotifikasjonState, action: NotifikasjonAction): NotifikasjonState => {
  const nextState = { ...state };
  const { payload } = action;
  switch (action.type) {
    case Actions.HandleResponse:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      if (nextState.notifikasjonType === NotifikasjonType.GravidSoknad) {
        const json = payload?.json;
        if (isGravidSoknadResponse(json)) {
          nextState.gravidSoknadResponse = json;
        }
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKrav) {
        const json = payload?.json;
        if (isGravidKravResponse(json)) {
          nextState.gravidKravResponse = json;
        }
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKravSlettet) {
        const json = payload?.json;
        if (isGravidKravResponse(json)) {
          nextState.gravidKravResponse = json;
        }
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskKrav) {
        const json = payload?.json;
        if (isKroniskKravResponse(json)) {
          nextState.kroniskKravResponse = json;
        }
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskSoknad) {
        const json = payload?.json;
        if (isKroniskSoknadResponse(json)) {
          nextState.kroniskSoknadResponse = json;
        }
      }

      return nextState;
    case Actions.HandleError:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      return nextState;
    case Actions.Reset:
      return { ...defaultNotifikasjonState() };
    default:
      return nextState;
  }
};

export default NotifikasjonReducer;
