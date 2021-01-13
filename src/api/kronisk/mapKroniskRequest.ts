import KroniskState from '../../components/kronisk/KroniskState';
import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';

export const mapKroniskRequest = (state: KroniskState): KroniskRequest => {
  if (!state.arbeid || state.arbeid?.length == 0) {
    throw new Error('Må ha minst en arbeidstype');
  }
  if (!state.paakjenninger || state.paakjenninger?.length == 0) {
    throw new Error('Må ha minst en påkjenningstype');
  }
  if (!state.fravaer || state.fravaer?.length == 0) {
    throw new Error('Må ha minst en fravær');
  }
  return {
    fnr: state.fnr,
    orgnr: state.orgnr,
    bekreftet: state.bekreft,
    arbeidstyper: state.arbeid,
    paakjenningstyper: state.paakjenninger,
    fravaer: mapFravaerData(state.fravaer || [])
  } as KroniskRequest;
};
