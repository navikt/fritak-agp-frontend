import ValidationResult from '../utils/ValidationResult';
import dayjs from 'dayjs';

export enum validateFraKeys {
  VALIDATE_FRA_MISSING = 'VALIDATE_FRA_MISSING',
  VALIDATE_FRA_FOM_INVALID = 'VALIDATE_FRA_FOM_INVALID',
  VALIDATE_FRA_FOM_ERROR = 'VALIDATE_FRA_FOM_ERROR'
}

export interface ValidateFraResult extends ValidationResult {
  key:
    | validateFraKeys.VALIDATE_FRA_MISSING
    | validateFraKeys.VALIDATE_FRA_FOM_INVALID
    | validateFraKeys.VALIDATE_FRA_FOM_ERROR;
}

export const validateFra = (
  fra: Date | undefined,
  minDate: Date,
  required: boolean = false
): ValidateFraResult | undefined => {
  if (required && !fra) {
    return { key: validateFraKeys.VALIDATE_FRA_MISSING };
  }

  if (required && fra && dayjs(fra).diff(minDate) < 0) {
    return {
      key: validateFraKeys.VALIDATE_FRA_FOM_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }

  return undefined;
};

export default validateFra;
