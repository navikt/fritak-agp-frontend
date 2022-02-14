import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

export const mapKroniskRequest = (
  fravaer: Array<Aarsfravaer>,
  fnr: string,
  orgnr: string,
  bekreft: boolean,
  antallPerioder: number,
  dokumentasjon: string | undefined
): KroniskRequest => {
  if (!fravaer || fravaer?.length == 0) {
    throw new Error('Må ha minst en fravær');
  }
  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    bekreftet: bekreft,
    fravaer: mapFravaerData(fravaer),
    antallPerioder,
    dokumentasjon: dokumentasjon
  } as KroniskRequest;
};
