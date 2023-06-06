import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import formatISO from '../../utils/formatISO';
import { getNumericPart } from '../../validation/validateSykemeldingsgrad';
import { Arbeidsgiverperiode } from './KroniskKravRequest';

export const beregnSykemeldingGradering = (sykemeldingsgrad: string | undefined): number => {
  if (!sykemeldingsgrad) {
    return 1;
  }
  const grad = getNumericPart(sykemeldingsgrad);
  if (grad) {
    return grad / 100;
  }
  return 1;
};

const mapPeriodeData = (perioder: KroniskKravPeriode[]): Array<Arbeidsgiverperiode> => {
  return perioder.map((enkeltPeriode) => ({
    perioder: enkeltPeriode.perioder.map((delPeriode) => ({
      fom: formatISO(delPeriode.fom) || '',
      tom: formatISO(delPeriode.tom) || ''
    })),
    antallDagerMedRefusjon: enkeltPeriode.dager ?? 0,
    månedsinntekt: enkeltPeriode.belop ?? 0,
    gradering: beregnSykemeldingGradering(enkeltPeriode.sykemeldingsgrad)
  }));
};

export default mapPeriodeData;
