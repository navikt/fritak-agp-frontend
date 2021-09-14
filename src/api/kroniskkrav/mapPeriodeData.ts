import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { datoToString } from '../../utils/dato/Dato';
import { getNumericPart } from '../../validation/validateSykemeldingsgrad';
import { Arbeidsgiverperiode } from './KroniskKravRequest';

export const beregnSykemeldingGradering = (sykemeldingsgrad: string): number => {
  const grad = getNumericPart(sykemeldingsgrad);
  if (grad) {
    return grad / 100;
  }
  return 1;
};

const mapPeriodeData = (perioder: KroniskKravPeriode[]): Array<Arbeidsgiverperiode> => {
  return perioder.map((enkeltPeriode) => ({
    fom: datoToString(enkeltPeriode.fom),
    tom: datoToString(enkeltPeriode.tom),
    antallDagerMedRefusjon: enkeltPeriode.dager ?? 0,
    månedsinntekt: enkeltPeriode.belop ?? 0,
    gradering: enkeltPeriode.sykemeldingsgrad ? beregnSykemeldingGradering(enkeltPeriode.sykemeldingsgrad) : 1
  }));
};

export default mapPeriodeData;
