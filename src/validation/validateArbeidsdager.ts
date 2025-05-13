import ValidationResult from '../utils/ValidationResult';

export enum ValidateArbeidsdagerKeys {
  VALIDATE_ARBEIDSDAGER_MISSING = 'VALIDATE_ARBEIDSDAGER_MISSING',
  VALIDATE_ARBEIDSDAGER_TOO_LOW = 'VALIDATE_ARBEIDSDAGER_TOO_LOW',
  VALIDATE_ARBEIDSDAGER_TOO_HIGH = 'VALIDATE_ARBEIDSDAGER_TOO_HIGH'
}

interface ValidateArbeidsdagerResult extends ValidationResult {
  key: ValidateArbeidsdagerKeys;
}

const validateArbeidsdager = (
  dager: number | undefined,
  required: boolean,
  minDager = 0,
  maxDager = 366
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
