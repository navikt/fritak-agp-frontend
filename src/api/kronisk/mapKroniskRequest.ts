import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';
import { ArbeidType } from '../../components/kronisk/ArbeidType';
import PaakjenningerType from '../../components/kronisk/PaakjenningerType';

export const mapKroniskRequest = (
  arbeid: Array<ArbeidType>,
  paakjenninger: Array<PaakjenningerType>,
  fravaer: Array<Aarsfravaer>,
  fnr: string,
  orgnr: string,
  bekreft: boolean,
  paakjenningBeskrivelse: string | undefined,
  antallPerioder: number,
  dokumentasjon: string | undefined
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
  if (paakjenninger.includes(PaakjenningerType.ANNET) && !paakjenningBeskrivelse) {
    throw new Error('Må ha kommentar til påkjenning');
  }
  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    bekreftet: bekreft,
    arbeidstyper: arbeid,
    paakjenningstyper: paakjenninger,
    paakjenningBeskrivelse,
    fravaer: mapFravaerData(fravaer),
    antallPerioder,
    dokumentasjon: dokumentasjon
  } as KroniskRequest;
};
