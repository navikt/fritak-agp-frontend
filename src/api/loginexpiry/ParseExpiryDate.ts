import { parseISO } from 'date-fns';

export const ParseExpiryDate = (value: string): Date => {
  return parseISO(value);
};
