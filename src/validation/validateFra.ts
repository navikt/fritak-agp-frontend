import { isValid } from 'date-fns';
import type { DateInputError } from '../utils/dato/Dato';
import isBeforeDate from '../utils/dato/isBeforeDate';
import ValidationResult from '../utils/ValidationResult';

export enum validateFraKeys {
  VALIDATE_FRA_MISSING = 'VALIDATE_FRA_MISSING',
  VALIDATE_FRA_FOM_INVALID = 'VALIDATE_FRA_FOM_INVALID',
  VALIDATE_FRA_FOM_ERROR = 'VALIDATE_FRA_FOM_ERROR'
}

interface ValidateFraResult extends ValidationResult {
  key:
    | validateFraKeys.VALIDATE_FRA_MISSING
    | validateFraKeys.VALIDATE_FRA_FOM_INVALID
    | validateFraKeys.VALIDATE_FRA_FOM_ERROR;
}

export const validateFra = (
  fra: Date | undefined,
  minDate: Date,
  required = false,
  inputError?: DateInputError
): ValidateFraResult | undefined => {
  if (!required) {
    return undefined;
  }
  if (inputError === 'beforeMin' || (fra && isValid(fra) && isBeforeDate(fra, minDate))) {
    return {
      key: validateFraKeys.VALIDATE_FRA_FOM_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }
  if (inputError || (fra && !isValid(fra))) {
    return { key: validateFraKeys.VALIDATE_FRA_FOM_ERROR };
  }
  if (!fra) {
    return { key: validateFraKeys.VALIDATE_FRA_MISSING };
  }
  return undefined;
};
