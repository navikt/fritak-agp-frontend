import { Arbeidsgiverperiode, KroniskKravRequest } from './KroniskKravRequest';
import { Dato, datoToString } from '../../utils/Dato';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';

export const mapKroniskKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  periode: Array<KroniskKravPeriode> | undefined,
  bekreft: boolean | undefined,
  kontrollDager: number | undefined
): KroniskKravRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (orgnr === undefined) {
    throw new Error('Orgnr må spesifiseres');
  }

  if (periode) {
    periode.forEach((enkeltPeriode) => {
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
  }
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }

  const periodeData = periode?.map((enkeltPeriode) => ({
    fom: datoToString(enkeltPeriode.fra),
    tom: datoToString(enkeltPeriode.til),
    antallDagerMedRefusjon: enkeltPeriode.dager,
    beloep: enkeltPeriode.beloep
  }));

  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    periode: periodeData as [Arbeidsgiverperiode],
    bekreftet: bekreft,
    kontrollDager: kontrollDager
  };
};
