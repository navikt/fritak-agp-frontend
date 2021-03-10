import NotifikasjonType from '../felles/NotifikasjonType';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';

export interface NotifikasjonState {
  status?: number;
  uuid?: string;
  notifikasjonType?: NotifikasjonType;
  gravidSoknadResponse?: GravidSoknadResponse;
  pathname?: string;
  gravidKravResponse?: GravidKravResponse;
  kroniskKravResponse?: KroniskKravResponse;
}

export const defaultNotitikasjonState = (state?: NotifikasjonState): NotifikasjonState => {
  return Object.assign({}, state || {});
};
