import KroniskState from '../../components/kronisk/KroniskState';
import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';

export const mapKroniskRequest = (state: KroniskState): KroniskRequest => {
  return {
    fnr: state.fnr,
    orgnr: state.orgnr,
    bekreftet: state.bekreft,
    arbeidstyper: state.arbeid,
    paakjenningstyper: state.paakjenninger,
    fravaer: mapFravaerData(state.fravaer || [])
  } as KroniskRequest;
};
