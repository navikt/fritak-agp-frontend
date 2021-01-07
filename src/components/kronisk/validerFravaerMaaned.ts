import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { MONTHS } from '../../utils/months';
import { maxDaysInMonth } from '../../utils/maxDaysInMonth';

export const validerFravaerMaaned = (
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
