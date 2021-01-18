import { GravidRequest } from './GravidRequest';
import { Tiltak } from '../../components/gravid/Tiltak';
import { OmplasseringAarsak } from '../../components/gravid/OmplasseringAarsak';
import { OmplasseringForsoek } from '../../components/gravid/OmplasseringForsoek';

export const mapGravidRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  tilrettelegge: boolean | undefined,
  tiltak: Array<Tiltak> | undefined,
  tiltakBeskrivelse: string | undefined,
  omplassering: OmplasseringForsoek | undefined,
  omplasseringAarsak: OmplasseringAarsak | undefined,
  dokumentasjon: string | undefined,
  bekreft: boolean | undefined
): GravidRequest => {
  if (!fnr) {
    throw new Error('Fnr må spesifiseres');
  }
  if (!orgnr) {
    throw new Error('Orgnr må spesifiseres');
  }
  if (tilrettelegge == undefined) {
    throw new Error('Tilrettelegge må spesifiseres');
  }
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }
  return {
    fnr: fnr,
    orgnr: orgnr,
    tilrettelegge: tilrettelegge,
    tiltak: tiltak,
    tiltakBeskrivelse: tiltakBeskrivelse,
    omplassering: omplassering,
    omplasseringAarsak: omplasseringAarsak,
    dokumentasjon: dokumentasjon,
    bekreftet: bekreft
  };
};
