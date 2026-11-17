import ValidationResult from '../utils/ValidationResult';

export enum ValidateDagerKeys {
  VALIDATE_DAGER_MISSING = 'VALIDATE_DAGER_MISSING',
  VALIDATE_DAGER_REQUIRED = 'VALIDATE_DAGER_REQUIRED',
  VALIDATE_DAGER_TOO_HIGH = 'VALIDATE_DAGER_TOO_HIGH'
}

interface ValidateDagerResult extends ValidationResult {
  key:
    | ValidateDagerKeys.VALIDATE_DAGER_MISSING
    | ValidateDagerKeys.VALIDATE_DAGER_REQUIRED
    | ValidateDagerKeys.VALIDATE_DAGER_TOO_HIGH;
}

const validateDager = (dager: number | undefined, required: boolean): ValidateDagerResult | undefined => {
  if (!dager) {
    return required ? { key: ValidateDagerKeys.VALIDATE_DAGER_MISSING } : undefined;
  }

  if (dager > 16) {
    return { key: ValidateDagerKeys.VALIDATE_DAGER_TOO_HIGH };
  }

  return dager === undefined ? { key: ValidateDagerKeys.VALIDATE_DAGER_REQUIRED } : undefined;
};

export default validateDager;
