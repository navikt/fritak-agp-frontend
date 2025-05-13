import ValidationResult from '../utils/ValidationResult';
import isValidOrgnr from './isValidOrgnr';

export enum validateOrgnrKeys {
  VALIDATE_ORGNR_MISSSING = 'VALIDATE_ORGNR_MISSSING',
  VALIDATE_ORGNR_INVALID = 'VALIDATE_ORGNR_INVALID'
}

interface ValidateOrgNrResult extends ValidationResult {
  key: validateOrgnrKeys.VALIDATE_ORGNR_MISSSING | validateOrgnrKeys.VALIDATE_ORGNR_INVALID;
}

export const validateOrgnr = (orgnr?: string, required = false): ValidateOrgNrResult | undefined => {
  if (orgnr == undefined || orgnr == '') {
    return required ? { key: validateOrgnrKeys.VALIDATE_ORGNR_MISSSING } : undefined;
  }
  if (!isValidOrgnr(orgnr)) {
    return required ? { key: validateOrgnrKeys.VALIDATE_ORGNR_INVALID } : undefined;
  }
  return undefined;
};

export default validateOrgnr;
