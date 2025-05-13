import ValidationResult from '../utils/ValidationResult';

export enum ValidateAntallPerioderKeys {
  VALIDATE_ANTALL_PERIODER_MISSING = 'VALIDATE_ANTALL_PERIODER_MISSING',
  VALIDATE_ANTALL_PERIODER_TOO_LOW = 'VALIDATE_ANTALL_PERIODER_TOO_LOW',
  VALIDATE_ANTALL_PERIODER_TOO_HIGH = 'VALIDATE_ANTALL_PERIODER_TOO_HIGH',
  VALIDATE_ANTALL_PERIODER_UTEN_DATA = 'VALIDATE_ANTALL_PERIODER_UTEN_DATA'
}

interface ValidateAntallPerioderResult extends ValidationResult {
  key: ValidateAntallPerioderKeys;
}

const validateAntallPerioder = (
  perioder: number | undefined,
  required: boolean,
  ikkeHistoriskFravaer: boolean,
  minPerioder = 0,
  maxPerioder = 366
): ValidateAntallPerioderResult | undefined => {
  if (!required) return undefined;
  if (ikkeHistoriskFravaer) {
    if (perioder && perioder > 0) {
      return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_UTEN_DATA };
    }
    return undefined;
  }
  if (perioder === undefined) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_MISSING };
  if (perioder < minPerioder) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_LOW };
  if (maxPerioder < perioder) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_HIGH };
  return undefined;
};

export default validateAntallPerioder;
