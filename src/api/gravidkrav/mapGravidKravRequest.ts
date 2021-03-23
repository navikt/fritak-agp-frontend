import { Arbeidsgiverperiode, GravidKravRequest } from './GravidKravRequest';
import { Dato, datoToString } from '../../utils/dato/Dato';

export const mapGravidKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  fra: Dato | undefined,
  til: Dato | undefined,
  dager: number | undefined,
  beloep: number | undefined,
  dokumentasjon: string | undefined,
  bekreft: boolean | undefined,
  kontrollDager: number | undefined
): GravidKravRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (orgnr === undefined) {
    throw new Error('Orgnr må spesifiseres');
  }
  if (fra?.error) {
    throw new Error('Fra må spesifiseres');
  }
  if (til?.error) {
    throw new Error('Til må spesifiseres');
  }
  if (dager === undefined) {
    throw new Error('Dager må spesifiseres');
  }
  if (beloep === undefined) {
    throw new Error('Beløp må spesifiseres');
  }
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }

  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    periode: {
      fom: datoToString(fra),
      tom: datoToString(til),
      antallDagerMedRefusjon: dager,
      beloep: beloep
    } as Arbeidsgiverperiode,
    dokumentasjon: dokumentasjon,
    bekreftet: bekreft,
    kontrollDager: kontrollDager
  };
};
