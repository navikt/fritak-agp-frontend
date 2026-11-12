import { differenceInCalendarDays, isValid } from 'date-fns';
import type { DateInputError } from '../utils/dato/Dato';
import isBeforeDate from '../utils/dato/isBeforeDate';
import ValidationResult from '../utils/ValidationResult';

export enum validateTilKeys {
  VALIDATE_TIL_MISSING = 'VALIDATE_TIL_MISSING',
  VALIDATE_TIL_INVALID = 'VALIDATE_TIL_INVALID',
  VALIDATE_TIL_FOM_ERROR = 'VALIDATE_TIL_FOM_ERROR',
  VALIDATE_TIL_ERROR = 'VALIDATE_TIL_ERROR',
  VALIDATE_TIL_TOO_EARLY = 'VALIDATE_TIL_TOO_EARLY'
}

interface ValidateTilResult extends ValidationResult {
  key:
    | validateTilKeys.VALIDATE_TIL_MISSING
    | validateTilKeys.VALIDATE_TIL_INVALID
    | validateTilKeys.VALIDATE_TIL_FOM_ERROR
    | validateTilKeys.VALIDATE_TIL_ERROR
    | validateTilKeys.VALIDATE_TIL_TOO_EARLY;
}

export const validateTil = (
  fra: Date | undefined,
  til: Date | undefined,
  minDate: Date,
  required = false,
  inputError?: DateInputError
): ValidateTilResult | undefined => {
  if (!required) {
    return undefined;
  }
  if (inputError === 'beforeMin' || (til && isValid(til) && isBeforeDate(til, minDate))) {
    return {
      key: validateTilKeys.VALIDATE_TIL_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }

  if (inputError || (til && !isValid(til))) {
    return { key: validateTilKeys.VALIDATE_TIL_ERROR };
  }
  if (!til) {
    return { key: validateTilKeys.VALIDATE_TIL_MISSING };
  }
  if (!fra) {
    return undefined;
  }
  if (!isValid(fra)) {
    return { key: validateTilKeys.VALIDATE_TIL_FOM_ERROR };
  }
  if (differenceInCalendarDays(fra, til) > 0) {
    return { key: validateTilKeys.VALIDATE_TIL_TOO_EARLY };
  }
  return undefined;
};
