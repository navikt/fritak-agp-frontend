import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { datoToString } from '../../utils/dato/Dato';

const mapPeriodeData = (perioder: KroniskKravPeriode[]) => {
  return perioder.map((enkeltPeriode) => ({
    fom: datoToString(enkeltPeriode.fra),
    tom: datoToString(enkeltPeriode.til),
    antallDagerMedRefusjon: enkeltPeriode.dager ?? 0,
    månedsinntekt: enkeltPeriode.beloep ?? 0
  }));
};

export default mapPeriodeData;
