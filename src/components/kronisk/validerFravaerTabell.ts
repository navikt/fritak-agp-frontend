import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Aarsfravaer } from './Aarsfravaer';
import { MONTHS } from '../../utils/months';
import { validerFravaerMaaned } from './validerFravaerMaaned';
import { monthKey } from '../../utils/monthKey';

export const validerFravaerTabell = (
  liste: Array<Aarsfravaer>
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
  if (isEmpty) {
    feilmeldinger.push({
      skjemaelementId: 'fravaer',
      feilmelding: 'Må fylles ut'
    });
  }
  return feilmeldinger;
};
