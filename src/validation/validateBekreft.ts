import ValidationResult from '../utils/ValidationResult';

export enum validateBekreftKeys {
  VALIDATE_BEKREFT_NOT_CHECKED = 'VALIDATE_BEKREFT_NOT_CHECKED'
}

const validateBekreft = (bekreft?: boolean, required: boolean = false): ValidationResult | undefined => {
  if (required === false) {
    return;
  }
  if (bekreft !== true) {
    return {
      key: validateBekreftKeys.VALIDATE_BEKREFT_NOT_CHECKED
    };
  }
  return undefined;
};

export default validateBekreft;
