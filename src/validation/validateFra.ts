import { Dato } from '../utils/dato/Dato';
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

export const validateFra = (fra: Dato | undefined, minDate: Date, required = false): ValidateFraResult | undefined => {
  if (required && !fra?.value) {
    return { key: validateFraKeys.VALIDATE_FRA_MISSING };
  }

  if (required && fra?.value && isBeforeDate(fra, minDate)) {
    return {
      key: validateFraKeys.VALIDATE_FRA_FOM_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }

  if (fra && fra.error) {
    return required ? { key: validateFraKeys.VALIDATE_FRA_FOM_ERROR } : undefined;
  }
  return undefined;
};
