import { Dato } from '../../utils/Dato';

export const validateTil = (fra: Dato, til: Dato, required: boolean): string | undefined => {
  if (!required) {
    return;
  }
  if (fra.error) {
    return fra.error;
  }
  if (til.error) {
    return til.error;
  }
  if (!fra.millis) {
    return 'Ukjent feil!';
  }
  if (!til.millis) {
    return 'Ukjent feil!';
  }
  if (fra?.millis >= til?.millis) {
    return 'Til dato kan ikke være før fra dato';
  }
};
