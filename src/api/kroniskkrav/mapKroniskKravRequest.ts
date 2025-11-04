import { KroniskKravRequest } from './KroniskKravRequest';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import mapPeriodeData from './mapPeriodeData';

export const mapKroniskKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  perioder: KroniskKravPeriode[] | undefined,
  bekreft: boolean | undefined,
  antallDager: number | undefined
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
    if (enkeltPeriode.fom?.error) {
      throw new Error('Fra må spesifiseres');
    }
    if (enkeltPeriode.tom?.error) {
      throw new Error('Til må spesifiseres');
    }
    if (enkeltPeriode.dager === undefined) {
      throw new Error('Dager må spesifiseres');
    }
    if (enkeltPeriode.belop === undefined) {
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
    perioder: periodeData,
    bekreftet: bekreft,
    antallDager: antallDager
  };
};
