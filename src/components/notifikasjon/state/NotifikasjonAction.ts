import NotifikasjonPayload from './NotifikasjonPayload';
import Actions from './Actions';

export interface NotifikasjonAction {
  type: Actions;
  payload?: NotifikasjonPayload;
}

export default NotifikasjonAction;
