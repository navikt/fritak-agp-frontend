import ValidationResult from '../utils/ValidationResult';

export enum ValidateDagerKeys {
  VALIDATE_DAGER_MISSING = 'VALIDATE_DAGER_MISSING',
  VALIDATE_DAGER_REQUIRED = 'VALIDATE_DAGER_REQUIRED'
}

export interface ValidateDagerResult extends ValidationResult {
  key: ValidateDagerKeys.VALIDATE_DAGER_MISSING | ValidateDagerKeys.VALIDATE_DAGER_REQUIRED;
}

const validateDager = (dager: number | undefined, required: boolean): ValidateDagerResult | undefined => {
  if (!dager) {
    return required ? { key: ValidateDagerKeys.VALIDATE_DAGER_MISSING } : undefined;
  }
  return dager === undefined ? { key: ValidateDagerKeys.VALIDATE_DAGER_REQUIRED } : undefined;
};

export default validateDager;
