import { Dato } from '../utils/Dato';

export const validateFra = (fra: Dato | undefined, required: boolean): string | undefined => {
  if (fra && fra.error) {
    return required ? fra.error : undefined;
  }
};

export default validateFra;
