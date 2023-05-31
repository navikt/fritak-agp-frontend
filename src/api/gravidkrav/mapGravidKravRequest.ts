import { GravidKravRequest } from './GravidKravRequest';
import { datoToString } from '../../utils/dato/Dato';
import { GravidKravPeriode } from '../../components/gravidkrav/GravidKravState';
import { Arbeidsgiverperiode } from '../kroniskkrav/KroniskKravRequest';
import { beregnSykemeldingGradering } from '../kroniskkrav/mapPeriodeData';

export const mapGravidKravRequest = (
  fnr: string | undefined,
  orgnr: string | undefined,
  perioder: Array<GravidKravPeriode> | undefined,
  bekreft: boolean | undefined,
  antallDager: number | undefined
): GravidKravRequest => {
  if (fnr === undefined) {
    throw new Error('Fnr må spesifiseres');
  }
  if (orgnr === undefined) {
    throw new Error('Orgnr må spesifiseres');
  }
  if (!perioder) {
    throw new Error('Perioder må spesifiseres');
  }
  perioder?.forEach((areidsgiverperiode) => {
    areidsgiverperiode.perioder.forEach((periode) => {
      if (periode.fom?.error) {
        throw new Error('Fra må spesifiseres');
      }
      if (periode.tom?.error) {
        throw new Error('Til må spesifiseres');
      }
    });
    if (areidsgiverperiode.dager === undefined) {
      throw new Error('Dager må spesifiseres');
    }
    if (areidsgiverperiode.belop === undefined) {
      throw new Error('Beløp må spesifiseres');
    }
  });
  if (!bekreft) {
    throw new Error('Bekreft må spesifiseres');
  }

  perioder = perioder || [];

  const arbeidsgiverPerioder: Array<Arbeidsgiverperiode> = perioder?.map((periode) => ({
    perioder: periode.perioder.map((delperiode) => ({
      fom: datoToString(delperiode.fom),
      tom: datoToString(delperiode.tom)
    })),
    antallDagerMedRefusjon: periode.dager || 0,
    månedsinntekt: Number(periode.belop || 0),
    gradering: beregnSykemeldingGradering(periode.sykemeldingsgrad)
  }));

  return {
    identitetsnummer: fnr,
    virksomhetsnummer: orgnr,
    perioder: arbeidsgiverPerioder,
    bekreftet: bekreft,
    antallDager: antallDager
  };
};
