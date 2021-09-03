import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import { datoToString } from '../../utils/dato/Dato';

const mapPeriodeData = (perioder: KroniskKravPeriode[]) => {
  return perioder.map((enkeltPeriode) => ({
    fom: datoToString(enkeltPeriode.fom),
    tom: datoToString(enkeltPeriode.tom),
    antallDagerMedRefusjon: enkeltPeriode.dager ?? 0,
    månedsinntekt: enkeltPeriode.belop ?? 0
  }));
};

export default mapPeriodeData;
