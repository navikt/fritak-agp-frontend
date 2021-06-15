import { Arbeidsgiverperiode, KroniskKravRequest } from './KroniskKravRequest';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import mapPeriodeData from './mapPeriodeData';

export const mapKroniskKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  perioder: Array<KroniskKravPeriode> | undefined,
  bekreft: boolean | undefined,
  kontrollDager: number | undefined
): KroniskKravRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (orgnr === undefined) {
    throw new Error('Orgnr må spesifiseres');
  }

  if (!perioder) {
    throw new Error('Perioder må spesifiseres');
  }

  perioder.forEach((enkeltPeriode) => {
    if (enkeltPeriode.fra?.error) {
      throw new Error('Fra må spesifiseres');
    }
    if (enkeltPeriode.til?.error) {
      throw new Error('Til må spesifiseres');
    }
    if (enkeltPeriode.dager === undefined) {
      throw new Error('Dager må spesifiseres');
    }
    if (enkeltPeriode.beloep === undefined) {
      throw new Error('Beløp må spesifiseres');
    }
  });

  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }

  const periodeData = perioder ? mapPeriodeData(perioder) : [];

  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    perioder: periodeData as [Arbeidsgiverperiode],
    bekreftet: bekreft,
    antallDager: kontrollDager
  };
};
