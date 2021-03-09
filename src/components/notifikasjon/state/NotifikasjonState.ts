import NotifikasjonType from '../felles/NotifikasjonType';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';
import { KroniskSoknadResponse } from '../../../api/kronisk/KroniskSoknadResponse';

export interface NotifikasjonState {
  status?: number;
  uuid?: string;
  notifikasjonType?: NotifikasjonType;
  gravidSoknadResponse?: GravidSoknadResponse;
  kroniskSoknadResponse?: KroniskSoknadResponse;
  pathname?: string;
}

export const defaultNotitikasjonState = (state?: NotifikasjonState): NotifikasjonState => {
  return Object.assign({}, state || {});
};
