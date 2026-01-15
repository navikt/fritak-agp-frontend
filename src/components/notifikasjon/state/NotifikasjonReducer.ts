import { defaultNotifikasjonState, NotifikasjonState } from './NotifikasjonState';
import { NotifikasjonAction } from './NotifikasjonAction';
import Actions from './Actions';
import NotifikasjonType from '../felles/NotifikasjonType';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';
import KroniskSoknadResponse from '../../../api/kronisk/KroniskSoknadResponse';

const NotifikasjonReducer = (state: NotifikasjonState, action: NotifikasjonAction): NotifikasjonState => {
  const nextState = { ...state };
  const { payload } = action;
  switch (action.type) {
    case Actions.HandleResponse:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      if (nextState.notifikasjonType === NotifikasjonType.GravidSoknad) {
        nextState.gravidSoknadResponse = payload?.json as GravidSoknadResponse | undefined;
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKrav) {
        nextState.gravidKravResponse = payload?.json as GravidKravResponse | undefined;
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKravSlettet) {
        nextState.gravidKravResponse = payload?.json as GravidKravResponse | undefined;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskKrav) {
        nextState.kroniskKravResponse = payload?.json as KroniskKravResponse | undefined;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskKravSlettet) {
        nextState.kroniskKravResponse = payload?.json as KroniskKravResponse | undefined;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskSoknad) {
        nextState.kroniskSoknadResponse = payload?.json as KroniskSoknadResponse | undefined;
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
