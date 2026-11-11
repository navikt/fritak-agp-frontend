import { format, isValid } from 'date-fns';

export type DateInputError = 'invalid' | 'beforeMin' | 'afterMax';

export const formatApiDate = (date: Date | undefined): string => {
  if (!date || !isValid(date)) {
    throw new Error('Gyldig dato må spesifiseres');
  }
  return format(date, 'yyyy-MM-dd');
};
