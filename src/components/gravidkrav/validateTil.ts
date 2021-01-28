import { Dato } from '../../utils/Dato';

export const validateTil = (fra: Dato, til: Dato, required: boolean): string | undefined => {
  if (!required) {
    return;
  }
  if (fra.error || !fra.millis) {
    return fra.error;
  }
  if (til.error || !til.millis) {
    return til.error;
  }
  if (fra.millis >= til.millis) {
    return 'Til dato kan ikke være før fra dato';
  }
};
