import validateArbeidsdager, { ValidateArbeidsdagerKeys } from './validateArbeidsdager';

describe('validateArbeidsdager', () => {
  it('should verify that there is a dager when required', () => {
    expect(validateArbeidsdager(123, true)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateArbeidsdager(123, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required', () => {
    expect(validateArbeidsdager(undefined, true)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING
    });
  });

  it('should not verify that there is a dager missing when not required', () => {
    expect(validateArbeidsdager(undefined, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required and dager is 0', () => {
    expect(validateArbeidsdager(undefined, true)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING
    });
  });

  it('should verify that there is an to low error when required and dager is below minimum', () => {
    expect(validateArbeidsdager(2, true, 5)).toEqual({ key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_LOW });
  });

  it('should verify that there is an to low error when required and dager is above maximum', () => {
    expect(validateArbeidsdager(12, true, 5, 10)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_HIGH
    });
  });
});
