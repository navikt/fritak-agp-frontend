import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';
import { PaakjenningerType } from '../../components/kronisk/PaakjenningerType';
import { ArbeidType } from '../../components/kronisk/ArbeidType';

export const mapKroniskRequest = (
  arbeid: Array<ArbeidType>,
  paakjenninger: Array<PaakjenningerType>,
  fravaer: Array<Aarsfravaer>,
  fnr: string,
  orgnr: string,
  bekreft: boolean
): KroniskRequest => {
  if (!arbeid || arbeid?.length == 0) {
    throw new Error('Må ha minst en arbeidstype');
  }
  if (!paakjenninger || paakjenninger?.length == 0) {
    throw new Error('Må ha minst en påkjenningstype');
  }
  if (!fravaer || fravaer?.length == 0) {
    throw new Error('Må ha minst en fravær');
  }
  return {
    fnr: fnr,
    orgnr: orgnr,
    bekreftet: bekreft,
    arbeidstyper: arbeid,
    paakjenningstyper: paakjenninger,
    fravaer: mapFravaerData(fravaer)
  } as KroniskRequest;
};
