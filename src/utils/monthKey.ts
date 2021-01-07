import { MONTHS } from './months';

export const monthKey = (month: string): string => {
  if (MONTHS.indexOf(month) < 0) {
    throw new Error('Ugyldig måned!');
  }
  return month.substr(0, 3).toLowerCase();
};
