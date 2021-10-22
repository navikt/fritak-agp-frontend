import { beregnSykemeldingGradering } from '../../api/kroniskkrav/mapPeriodeData';
import { KroniskKravPeriode } from './KroniskKravState';

const beregnRefusjon = (enkeltPeriode: KroniskKravPeriode, lonnspliktDager: number | undefined): number => {
  if (!enkeltPeriode.belop || !enkeltPeriode.dager || !enkeltPeriode.grunnbeloep || !lonnspliktDager) {
    return 0;
  }

  const aarsBelop = enkeltPeriode.belop * 12;
  const aarsGrunnbelop = enkeltPeriode.grunnbeloep * 6;
  const grad = beregnSykemeldingGradering(enkeltPeriode.sykemeldingsgrad);

  if (aarsBelop > aarsGrunnbelop) {
    const gRefusjon = (aarsGrunnbelop / lonnspliktDager) * enkeltPeriode.dager;
    return Math.round((gRefusjon * grad + Number.EPSILON) * 100) / 100;
  } else {
    const aarsRefusjon = (aarsBelop / lonnspliktDager) * enkeltPeriode.dager;
    return Math.round((aarsRefusjon * grad + Number.EPSILON) * 100) / 100;
  }
};

export default beregnRefusjon;
