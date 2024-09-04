import { defaultNotifikasjonState, NotifikasjonState } from './NotifikasjonState';
import { NotifikasjonAction } from './NotifikasjonAction';
import Actions from './Actions';
import NotifikasjonType from '../felles/NotifikasjonType';

const NotifikasjonReducer = (state: NotifikasjonState, action: NotifikasjonAction): NotifikasjonState => {
  const nextState = { ...state };
  const { payload } = action;
  switch (action.type) {
    case Actions.HandleResponse:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      if (nextState.notifikasjonType === NotifikasjonType.GravidSoknad) {
        nextState.gravidSoknadResponse = payload?.json;
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKrav) {
        nextState.gravidKravResponse = payload?.json;
      }

      if (nextState.notifikasjonType === NotifikasjonType.GravidKravSlettet) {
        nextState.gravidKravResponse = payload?.json;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskKrav) {
        nextState.kroniskKravResponse = payload?.json;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskKravSlettet) {
        nextState.kroniskKravResponse = payload?.json;
      }

      if (nextState.notifikasjonType === NotifikasjonType.KroniskSoknad) {
        nextState.kroniskSoknadResponse = payload?.json;
      }

      return nextState;
    case Actions.HandleError:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      return nextState;
    case Actions.Reset:
      return Object.assign({}, defaultNotifikasjonState());
    default:
      return nextState;
  }
};

export default NotifikasjonReducer;
