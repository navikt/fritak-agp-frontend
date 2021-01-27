import { Dato } from '../../utils/Dato';

export const validateFra = (fra: Dato, required: boolean): string | undefined => {
  if (fra.error) {
    return required ? fra.error : undefined;
  }
};
