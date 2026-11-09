import { beregnSykemeldingGradering } from '../../../api/kroniskkrav/mapPeriodeData';
import type { KravPeriodeData } from '../../../state/KravPeriodeData';

const beregnRefusjon = (enkeltPeriode: KravPeriodeData, lonnspliktDager: number | undefined): number => {
  if (!enkeltPeriode.beloep || !enkeltPeriode.dager || !enkeltPeriode.grunnbeloep || !lonnspliktDager) {
    return 0;
  }

  const aarsBeloep = enkeltPeriode.beloep * 12;
  const aarsGrunnbeloep = enkeltPeriode.grunnbeloep * 6;
  const grad = beregnSykemeldingGradering(enkeltPeriode.sykemeldingsgrad);

  if (aarsBeloep > aarsGrunnbeloep) {
    const gRefusjon = (aarsGrunnbeloep / lonnspliktDager) * enkeltPeriode.dager;
    return Math.round((gRefusjon * grad + Number.EPSILON) * 100) / 100;
  } else {
    const aarsRefusjon = (aarsBeloep / lonnspliktDager) * enkeltPeriode.dager;
    return Math.round((aarsRefusjon * grad + Number.EPSILON) * 100) / 100;
  }
};

export default beregnRefusjon;
