import NotifikasjonType from '../felles/NotifikasjonType';
import { GravidSoknadResponse } from '../../../api/gravid/GravidSoknadResponse';
import GravidKravResponse from '../../../api/gravidkrav/GravidKravResponse';
import KroniskKravResponse from '../../../api/gravidkrav/KroniskKravResponse';
import KroniskSoknadResponse from '../../../api/kronisk/KroniskSoknadResponse';

export interface NotifikasjonState {
  status?: number;
  uuid?: string;
  notifikasjonType?: NotifikasjonType;
  gravidSoknadResponse?: GravidSoknadResponse;
  kroniskSoknadResponse?: KroniskSoknadResponse;
  pathname?: string;
  gravidKravResponse?: GravidKravResponse;
  kroniskKravResponse?: KroniskKravResponse;
}

export const defaultNotifikasjonState = (state?: NotifikasjonState): NotifikasjonState => {
  return Object.assign({}, state || {});
};
