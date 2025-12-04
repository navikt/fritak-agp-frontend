import { isBefore } from 'date-fns';
import { Dato } from './Dato';

const isBeforeDate = (dagen: Dato, minDate: Date): boolean => {
  const currentDate = new Date(dagen.year ?? 0, (dagen.month ?? 1) - 1, dagen.day ?? 1);
  return isBefore(currentDate, minDate);
};

export default isBeforeDate;
