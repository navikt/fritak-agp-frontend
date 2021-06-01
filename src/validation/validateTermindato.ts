import { Dato } from '../utils/dato/Dato';

export const validateTermindato = (termindato: Dato | undefined, required: boolean): string | undefined => {
  if (!termindato?.value) {
    return required ? 'Mangler termindato' : undefined;
  }

  if (termindato && termindato.error) {
    return required ? termindato.error : undefined;
  }
};
