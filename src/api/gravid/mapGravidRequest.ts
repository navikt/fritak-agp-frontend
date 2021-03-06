import { GravidRequest } from './GravidRequest';
import { Tiltak } from '../../components/gravid/Tiltak';
import { Aarsak } from '../../components/gravid/Aarsak';
import { Omplassering } from '../../components/gravid/Omplassering';
import { Dato, datoToString } from '../../utils/dato/Dato';

export const mapGravidRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  tilrettelegge: boolean | undefined,
  tiltak: Array<Tiltak> | undefined,
  tiltakBeskrivelse: string | undefined,
  omplassering: Omplassering | undefined,
  omplasseringAarsak: Aarsak | undefined,
  dokumentasjon: string | undefined,
  bekreft: boolean | undefined,
  termindato: Dato | undefined
): GravidRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (orgnr === undefined) {
    throw new Error('Orgnr må spesifiseres');
  }
  if (tilrettelegge === undefined) {
    throw new Error('Tilrettelegge må spesifiseres');
  }
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }
  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    tilrettelegge: tilrettelegge,
    tiltak: tiltak,
    tiltakBeskrivelse: tiltakBeskrivelse,
    omplassering: omplassering,
    omplasseringAarsak: omplasseringAarsak,
    dokumentasjon: dokumentasjon,
    bekreftet: bekreft,
    termindato: termindato ? datoToString(termindato) : undefined
  };
};
