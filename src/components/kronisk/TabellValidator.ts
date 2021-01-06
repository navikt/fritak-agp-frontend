import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Årsfravær } from './Årsfravær';
import { MONTHS } from './DagerTabell';

export const maxDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

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
      skjemaelementId: 'dager',
      feilmelding: MONTHS[month] + ' må være 0 eller mer'
    };
  }
  const maxDays = maxDaysInMonth(year, month);
  if (dag > maxDays) {
    return {
      skjemaelementId: 'dager',
      feilmelding: MONTHS[month] + ' må være mindre enn ' + maxDays
    };
  }
  return;
};

export const validerTabell = (
  liste: Array<Årsfravær>
): FeiloppsummeringFeil[] => {
  let feilmeldinger = new Array<FeiloppsummeringFeil>();
  let isEmpty = false;
  liste.forEach((l) => {
    MONTHS.forEach((m, index) => {
      const month = m.substr(0, 3).toLowerCase();
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
      skjemaelementId: 'fravær',
      feilmelding: 'Du må fylle ut minste en'
    });
  }
  return feilmeldinger;
};
