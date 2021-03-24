import Aarsfravaer from '../../components/kronisk/Aarsfravaer';
import { FravaerData } from './KroniskRequest';

const shortMonthName = Object.freeze([
  'jan',
  'feb',
  'mar',
  'apr',
  'mai',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'des'
]);

export const mapFravaerData = (fravaer: Array<Aarsfravaer>): FravaerData[] => {
  if (fravaer.length == 0) {
    return [];
  }
  return fravaer.flatMap((aarsfravaer) => {
    const year = aarsfravaer.year;
    const monthDays = Object.keys(aarsfravaer);
    monthDays.splice(monthDays.indexOf('year'), 1);
    return monthDays.map((monthName) => {
      const dayNr = '00' + (shortMonthName.indexOf(monthName) + 1);
      const paddedDayNr = dayNr.substring(dayNr.length - 2, dayNr.length);
      return {
        yearMonth: `${year}-${paddedDayNr}`,
        antallDagerMedFravaer: aarsfravaer[monthName]
      };
    });
  });
};
