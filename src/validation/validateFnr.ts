import ValidationResult from '../utils/ValidationResult';
import isValidFnr from './isValidFnr';

export enum validateFnrKeys {
  VALIDATE_FNR_MISSING = 'VALIDATE_FNR_MISSING',
  VALIDATE_FNR_INVALID = 'VALIDATE_FNR_INVALID'
}

export interface FnrValidationResult extends ValidationResult {
  key: validateFnrKeys.VALIDATE_FNR_MISSING | validateFnrKeys.VALIDATE_FNR_INVALID;
}

export const validateFnr = (orgnr?: string, required = false): FnrValidationResult | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? { key: validateFnrKeys.VALIDATE_FNR_MISSING } : undefined;
  }
  if (!isValidFnr(orgnr)) {
    return required ? { key: validateFnrKeys.VALIDATE_FNR_INVALID } : undefined;
  }
  return undefined;
};

export default validateFnr;
