import NotifikasjonType from '../felles/NotifikasjonType';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';

export interface NotifikasjonState {
  status?: number;
  uuid?: string;
  notifikasjonType?: NotifikasjonType;
  gravidSoknadResponse?: GravidSoknadResponse;
  pathname?: string;
}

export const defaultNotitikasjonState = (state?: NotifikasjonState): NotifikasjonState => {
  return Object.assign({}, state || {});
};
