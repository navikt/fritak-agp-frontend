import { defaultNotitikasjonState, NotifikasjonState } from './NotifikasjonState';
import { Actions, NotifikasjonAction } from './NotifikasjonAction';

const NotifikasjonReducer = (state: NotifikasjonState, action: NotifikasjonAction): NotifikasjonState => {
  const nextState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case Actions.HandleResponse:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      nextState.gravidSoknadResponse = payload?.json;
      return nextState;
    case Actions.HandleError:
      nextState.status = payload?.status;
      nextState.uuid = payload?.uuid;
      nextState.notifikasjonType = payload?.notifikasjonsType;
      return nextState;
    case Actions.Reset:
      return Object.assign({}, defaultNotitikasjonState());
    default:
      return nextState;
  }
};

export default NotifikasjonReducer;
