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
  const maxDays = maxDaysInMonth(year, month);
  if (dag < 0) {
    return {
      skjemaelementId: MONTHS[month] + '-' + year,
      feilmelding:
        MONTHS[month] + ' ' + year + ' må være mindre enn ' + maxDays + ' dager'
    };
  }
  if (dag > maxDays) {
    return {
      skjemaelementId: MONTHS[month] + '-' + year,
      feilmelding:
        MONTHS[month] +
        ' ' +
        year +
        ' må være mindre eller lik ' +
        maxDays +
        ' dager'
    };
  }
  return;
};
