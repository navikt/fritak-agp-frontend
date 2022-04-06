import { KroniskRequest } from './KroniskRequest';
import { mapFravaerData } from './mapFravaerData';
import { Aarsfravaer } from '../../components/kronisk/Aarsfravaer';

export const mapKroniskRequest = (
  fravaer: Array<Aarsfravaer>,
  fnr: string,
  orgnr: string,
  bekreft: boolean,
  antallPerioder: number,
  dokumentasjon: string | undefined,
  ikkeHistoriskFravaer: boolean
): KroniskRequest => {
  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    bekreftet: bekreft,
    fravaer: mapFravaerData(fravaer),
    antallPerioder,
    dokumentasjon: dokumentasjon,
    ikkeHistoriskFravaer: ikkeHistoriskFravaer
  } as KroniskRequest;
};
