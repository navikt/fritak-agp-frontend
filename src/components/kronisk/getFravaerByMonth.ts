import { Aarsfravaer } from './Aarsfravaer';
import { monthKey } from '../../utils/monthKey';
import { MONTHS } from '../../utils/months';

export const getFravaerByMonth = (
  year: number,
  month: number,
  fravaer?: Array<Aarsfravaer>
): number | undefined => {
  if (!fravaer || fravaer.length == 0) {
    return;
  }
  const a = fravaer.find((f) => f.year == year);
  if (!a) {
    return;
  }
  return a[monthKey(MONTHS[month])];
};
