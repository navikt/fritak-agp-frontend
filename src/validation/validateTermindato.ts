import { Dato } from '../utils/dato/Dato';

export const validateTermindato = (
  termindato: Dato | undefined,
  required: boolean,
  feilmelding: string
): string | undefined => {
  if (!termindato?.value) {
    return required ? feilmelding : undefined;
  }

  if (termindato && termindato.error) {
    return required ? termindato.error : undefined;
  }
};

export default validateTermindato;
