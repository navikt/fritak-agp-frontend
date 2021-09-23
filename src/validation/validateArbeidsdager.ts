import ValidationResult from '@navikt/helse-arbeidsgiver-felles-frontend/dist/validation/ValidationResult';

export enum ValidateArbeidsdagerKeys {
  VALIDATE_ARBEIDSDAGER_MISSING = 'VALIDATE_ARBEIDSDAGER_MISSING',
  VALIDATE_ARBEIDSDAGER_TOO_LOW = 'VALIDATE_ARBEIDSDAGER_TOO_LOW',
  VALIDATE_ARBEIDSDAGER_TOO_HIGH = 'VALIDATE_ARBEIDSDAGER_TOO_HIGH'
}

export interface ValidateArbeidsdagerResult extends ValidationResult {
  key: ValidateArbeidsdagerKeys;
}

export const validateArbeidsdager = (
  dager: number | undefined,
  required: boolean,
  minDager: number = 0,
  maxDager: number = 366
): ValidateArbeidsdagerResult | undefined => {
  if (!required) return undefined;
  if (!dager) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING };
  if (dager < minDager) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_LOW };
  if (maxDager < dager) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_HIGH };
  return undefined;
};

export default validateArbeidsdager;
