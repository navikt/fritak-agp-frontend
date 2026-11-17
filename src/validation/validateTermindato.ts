import { isValid } from 'date-fns';
import type { DateInputError } from '../utils/dato/Dato';

export const validateTermindato = (
  termindato: Date | undefined,
  required: boolean,
  feilmelding: string,
  inputError?: DateInputError
): string | undefined => {
  if (!required) {
    return undefined;
  }
  if (inputError || (termindato && !isValid(termindato))) {
    return 'Ugyldig dato';
  }
  if (!termindato) {
    return feilmelding;
  }
};
