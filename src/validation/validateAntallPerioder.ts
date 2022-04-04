import ValidationResult from '@navikt/helse-arbeidsgiver-felles-frontend/dist/validation/ValidationResult';

export enum ValidateAntallPerioderKeys {
  VALIDATE_ANTALL_PERIODER_MISSING = 'VALIDATE_ANTALL_PERIODER_MISSING',
  VALIDATE_ANTALL_PERIODER_TOO_LOW = 'VALIDATE_ANTALL_PERIODER_TOO_LOW',
  VALIDATE_ANTALL_PERIODER_TOO_HIGH = 'VALIDATE_ANTALL_PERIODER_TOO_HIGH'
}

export interface ValidateAntallPerioderResult extends ValidationResult {
  key: ValidateAntallPerioderKeys;
}

export const validateAntallPerioder = (
  dager: number | undefined,
  required: boolean,
  perioderUnntak: boolean,
  minDager: number = 0,
  maxDager: number = 366
): ValidateAntallPerioderResult | undefined => {
  if (!required) return undefined;
  if (perioderUnntak) return undefined;
  if (dager === undefined) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_MISSING };
  if (dager < minDager) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_LOW };
  if (maxDager < dager) return { key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_HIGH };
  return undefined;
};

export default validateAntallPerioder;
