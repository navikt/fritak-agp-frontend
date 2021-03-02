import { Dato } from '../utils/Dato';

export const validateFra = (fra: Dato | undefined, required: boolean): string | undefined => {
  if (!fra?.value) {
    return required ? 'Mangler fra dato' : undefined;
  }

  if (fra && fra.error) {
    return required ? fra.error : undefined;
  }
};

export default validateFra;
