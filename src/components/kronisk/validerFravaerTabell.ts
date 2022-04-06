import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Aarsfravaer } from './Aarsfravaer';
import { MONTHS } from '../../utils/months';
import { validerFravaerMaaned } from './validerFravaerMaaned';
import { monthKey } from '../../utils/monthKey';

export const validerFravaerTabell = (
  liste: Array<Aarsfravaer>,
  ikkeHistoriskFravaer: boolean
): FeiloppsummeringFeil[] => {
  let feilmeldinger = new Array<FeiloppsummeringFeil>();
  let isEmpty = true;

  liste.forEach((l) => {
    MONTHS.forEach((m, index) => {
      const month = monthKey(m);
      const dager = l[month];
      if (dager != undefined) {
        isEmpty = false;
      }
      let feilmelding = validerFravaerMaaned(l.year, index, dager);
      if (feilmelding) {
        feilmeldinger.push(feilmelding);
      }
    });
  });

  if (ikkeHistoriskFravaer === true) {
    if (isEmpty) return feilmeldinger;
    feilmeldinger.push({
      skjemaelementId: 'fravaer',
      feilmelding: 'Fravær kan ikke være fylt ut når det er huket av for at det ikke finnes historisk fravær.'
    });
  }

  if (isEmpty) {
    feilmeldinger.push({
      skjemaelementId: 'fravaer',
      feilmelding: 'Fravær må fylles ut.'
    });
  }
  return feilmeldinger;
};
