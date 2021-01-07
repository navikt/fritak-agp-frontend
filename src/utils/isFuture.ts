import { MONTHS } from './months';

export const isFuture = (
  year: number,
  month: string,
  thisYear: number,
  thisMonth: number
) => {
  const monthIndex = MONTHS.indexOf(month);
  if (thisYear > year) {
    return false;
  }
  return thisMonth < monthIndex;
};
