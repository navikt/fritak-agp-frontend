import ValidationResult from '../utils/ValidationResult';

export enum ValidateDokumentasjonKeys {
  VALIDATE_DOKUMENTASJON_MINIMUM_SIZE = 'VALIDATE_DOKUMENTASJON_MINIMUM_SIZE',
  VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE = 'VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE'
}

interface ValidateDokumentasjonResult extends ValidationResult {
  key:
    | ValidateDokumentasjonKeys.VALIDATE_DOKUMENTASJON_MINIMUM_SIZE
    | ValidateDokumentasjonKeys.VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE;
}

const validateDokumentasjon = (dokumentasjon: string | undefined): ValidateDokumentasjonResult | undefined => {
  if (dokumentasjon && dokumentasjon.length < 500) {
    return { key: ValidateDokumentasjonKeys.VALIDATE_DOKUMENTASJON_MINIMUM_SIZE };
  }

  if (dokumentasjon && dokumentasjon.length > 10485760) {
    return { key: ValidateDokumentasjonKeys.VALIDATE_DOKUMENTASJON_MAXIMUM_SIZE };
  }

  return undefined;
};

export default validateDokumentasjon;
