import { Dato } from '../utils/Dato';

export const validateTil = (fra: Dato | undefined, til: Dato | undefined, required: boolean): string | undefined => {
  if (!til?.value) {
    return required ? 'Mangler til dato' : undefined;
  }

  if (!fra || !til) {
    return;
  }

  if (!required) {
    return;
  }
  if (fra.error || !fra.millis) {
    return fra.error;
  }
  if (til.error || !til.millis) {
    return til.error;
  }
  if (fra.millis > til.millis) {
    return 'Til dato kan ikke være før fra dato';
  }
};

export default validateTil;
