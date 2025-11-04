import ValidationResult from '../utils/ValidationResult';

export enum validateSykemeldingGradKeys {
  VALIDATE_SYKEMELDINGSGRAD_LOW = 'VALIDATE_SYKEMELDINGSGRAD_LOW',
  VALIDATE_SYKEMELDINGSGRAD_HIGH = 'VALIDATE_SYKEMELDINGSGRAD_HIGH'
}

interface ValidateSykemeldingGradResult extends ValidationResult {
  key:
    | validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW
    | validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH;
}

const validateSykemeldingGrad = (
  sykemeldingGrad: string | undefined,
  required: boolean
): ValidateSykemeldingGradResult | undefined => {
  const numericSykemeldingGrad = getNumericPart(sykemeldingGrad);
  if (!numericSykemeldingGrad) return;

  if (numericSykemeldingGrad < 20 && required) {
    return { key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW };
  }
  if (numericSykemeldingGrad > 100 && required) {
    return { key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH };
  }
  return undefined;
};

export default validateSykemeldingGrad;

export const getNumericPart = (sykmeldingGrad: string | undefined): number | undefined => {
  const inputLength = sykmeldingGrad?.match(/\d+/)?.length;
  if (inputLength && inputLength > 0 && sykmeldingGrad && sykmeldingGrad.match(/\d+/)) {
    const numbersArray = sykmeldingGrad?.match(/\d+/);
    const numbers = numbersArray && numbersArray[0];
    return Number(numbers);
  }

  return undefined;
};
