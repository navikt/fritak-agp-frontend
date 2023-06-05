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
  fra: Date | undefined,
  til: Date | undefined,
  minDate: Date,
  required: boolean = false
): ValidateTilResult | undefined => {
  if (!til) {
    return required ? { key: validateTilKeys.VALIDATE_TIL_MISSING } : undefined;
  }

  if (required && til < minDate) {
    return {
      key: validateTilKeys.VALIDATE_TIL_INVALID,
      value: minDate.toLocaleDateString('nb')
    };
  }

  if (!fra) {
    return undefined;
  }

  if (!required) {
    return;
  }

  if (fra > til) {
    return { key: validateTilKeys.VALIDATE_TIL_TOO_EARLY };
  }

  return undefined;
};

export default validateTil;
