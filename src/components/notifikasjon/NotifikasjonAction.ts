import { NotifikasjonPayload } from './NotifikasjonPayload';

export interface NotifikasjonAction {
  type: Actions;
  payload?: NotifikasjonPayload;
}

export enum Actions {
  Reset,
  HandleResponse,
  HandleError
}

export default NotifikasjonAction;
