import ValidationResult from '@navikt/helse-arbeidsgiver-felles-frontend/dist/validation/ValidationResult';

export enum ValidateSykemeldingsgradKeys {
  VALIDATE_SYKEMELDINGSGRAD_LOW = 'VALIDATE_SYKEMELDINGSGRAD_LOW',
  VALIDATE_SYKEMELDINGSGRAD_HIGH = 'VALIDATE_SYKEMELDINGSGRAD_HIGH'
}

export interface ValidatesykemeldingsgradResult extends ValidationResult {
  key:
    | ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW
    | ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH;
}

export const validateSykemeldingsgrad = (
  sykemeldingsgrad: string | undefined,
  required: boolean
): ValidatesykemeldingsgradResult | undefined => {
  const numericSykemeldingsgrad = getNumericPart(sykemeldingsgrad);

  if (!numericSykemeldingsgrad) return;

  if (numericSykemeldingsgrad < 20 && required) {
    return { key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW };
  }
  if (numericSykemeldingsgrad > 100 && required) {
    return { key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH };
  }
  return undefined;
};

export default validateSykemeldingsgrad;

export const getNumericPart = (smgrad: string | undefined): number | undefined => {
  const inputLength = smgrad?.match(/\d+/)?.length;
  if (inputLength && inputLength > 0 && smgrad && smgrad.match(/\d+/)) {
    const numbersArray = smgrad?.match(/\d+/);
    const numbers = numbersArray && numbersArray[0];
    return Number(numbers);
  }

  return undefined;
};
