import ValidationResult from '../utils/ValidationResult';

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
  const numbers = /^\d+$/;
  if (dager === undefined) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING };
  if (dager < minDager) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_LOW };
  if (maxDager < dager) return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_HIGH };
  if (dager !== undefined && numbers.exec(dager.toString())) {
    return undefined;
  } else {
    return { key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING };
  }
};

export default validateArbeidsdager;
