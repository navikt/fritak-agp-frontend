import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Aarsfravaer } from './Aarsfravaer';
import { monthKey, MONTHS } from '../../utils/months';
import { maxDaysInMonth } from '../../utils/maxDaysInMonth';

export const validerDag = (
  year: number,
  month: number,
  dag?: number
): FeiloppsummeringFeil | undefined => {
  if (!dag) {
    return;
  }
  if (dag < 0) {
    return {
      skjemaelementId: 'fravaer',
      feilmelding: MONTHS[month] + ' må være 0 eller mer'
    };
  }
  const maxDays = maxDaysInMonth(year, month);
  if (dag > maxDays) {
    return {
      skjemaelementId: 'fravaer',
      feilmelding: MONTHS[month] + ' må være mindre enn ' + maxDays
    };
  }
  return;
};

export const validerTabell = (
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
      let feilmelding = validerDag(l.year, index, dager);
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
