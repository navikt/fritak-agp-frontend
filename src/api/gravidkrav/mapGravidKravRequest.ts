import { Arbeidsgiverperiode, GravidKravRequest } from './GravidKravRequest';
import { Dato, datoToString } from '../../utils/dato/Dato';
import { Periode } from '../../components/gravidkrav/GravidKravState';

export const mapGravidKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  // fra: Dato | undefined,
  // til: Dato | undefined,
  // dager: number | undefined,
  // beloep: number | undefined,
  perioder: Array<Periode> | undefined,
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
  perioder?.forEach((periode) => {
    if (periode.fom?.error) {
      throw new Error('Fra må spesifiseres');
    }
    if (periode.tom?.error) {
      throw new Error('Til må spesifiseres');
    }
    if (periode.dager === undefined) {
      throw new Error('Dager må spesifiseres');
    }
    if (periode.beloep === undefined) {
      throw new Error('Beløp må spesifiseres');
    }
  });
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }

  perioder = perioder || [];

  const arbeidsgiverPerioder: Array<Arbeidsgiverperiode> = perioder?.map((periode) => ({
    fom: datoToString(periode.fom),
    tom: datoToString(periode.tom),
    antallDagerMedRefusjon: periode.dager || 0,
    beloep: Number(periode.beloep || 0)
  }));

  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    perioder: arbeidsgiverPerioder,
    dokumentasjon: dokumentasjon,
    bekreftet: bekreft,
    kontrollDager: kontrollDager
  };
};
