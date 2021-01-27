import { Dato } from '../../utils/Dato';

export const validateTil = (til: Dato, fra: Dato, required: boolean): string | undefined => {
  if (til.error) {
    return required ? til.error : undefined;
  }
};
