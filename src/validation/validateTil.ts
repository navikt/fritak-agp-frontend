import { Dato } from '../utils/dato/Dato';
import isBeforeDate from '../utils/dato/isBeforeDate';
import ValidationResult from '../utils/ValidationResult';

export enum validateTilKeys {
  VALIDATE_TIL_MISSING = 'VALIDATE_TIL_MISSING',
  VALIDATE_TIL_INVALID = 'VALIDATE_TIL_INVALID',
  VALIDATE_TIL_FOM_ERROR = 'VALIDATE_TIL_FOM_ERROR',
  VALIDATE_TIL_ERROR = 'VALIDATE_TIL_ERROR',
  VALIDATE_TIL_TOO_EARLY = 'VALIDATE_TIL_TOO_EARLY'
}

export interface ValidateTilResult extends ValidationResult {
  key:
    | validateTilKeys.VALIDATE_TIL_MISSING
    | validateTilKeys.VALIDATE_TIL_INVALID
    | validateTilKeys.VALIDATE_TIL_FOM_ERROR
    | validateTilKeys.VALIDATE_TIL_ERROR
    | validateTilKeys.VALIDATE_TIL_TOO_EARLY;
}

const validateTil = (
  fra: Dato | undefined,
  til: Dato | undefined,
  minDate: Date,
  required = false
): ValidateTilResult | undefined => {
  if (!til?.value) {
    return required ? { key: validateTilKeys.VALIDATE_TIL_MISSING } : undefined;
  }

  if (required && til?.value && isBeforeDate(til, minDate)) {
    return {
      key: validateTilKeys.VALIDATE_TIL_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }

  if (!fra || !til) {
    return undefined;
  }

  if (!required) {
    return;
  }
  if (fra.error || !fra.millis) {
    return { key: validateTilKeys.VALIDATE_TIL_FOM_ERROR };
  }
  if (til.error || !til.millis) {
    return { key: validateTilKeys.VALIDATE_TIL_ERROR };
  }
  if (fra.millis > til.millis) {
    return { key: validateTilKeys.VALIDATE_TIL_TOO_EARLY };
  }
  return undefined;
};

export default validateTil;
