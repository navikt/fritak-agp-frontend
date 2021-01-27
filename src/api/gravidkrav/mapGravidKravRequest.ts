import { Arbeidsgiverperiode, GravidKravRequest } from './GravidKravRequest';

export const mapGravidKravRequest = (
  fnr: string | undefined,
  fra: string | undefined,
  til: string | undefined,
  dager: number | undefined,
  beloep: number | undefined,
  dokumentasjon: string | undefined,
  bekreft: boolean | undefined
): GravidKravRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (fra === undefined) {
    throw new Error('Fra må spesifiseres');
  }
  if (til === undefined) {
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
    virksomhetsnummer: '',
    periode: {
      fom: fra,
      tom: til,
      antallDagerMedRefusjon: dager,
      beloep: beloep
    } as Arbeidsgiverperiode,
    dokumentasjon: dokumentasjon,
    bekreftet: bekreft
  };
};
