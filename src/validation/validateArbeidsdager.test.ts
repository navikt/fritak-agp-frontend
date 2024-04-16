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

  it('should verify that there is no dager missing when required and dager is 0', () => {
    expect(validateArbeidsdager(0, true)).toBeUndefined();
  });

  it('should verify that there is no dager missing when required and dager is 0 and min is 1', () => {
    expect(validateArbeidsdager(0, true, 1)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_LOW
    });
  });

  it('should return undefined when not required and dager is 0', () => {
    expect(validateArbeidsdager(0, false)).toBeUndefined();
  });

  it('should verify that there is an to low error when required and dager is below minimum', () => {
    expect(validateArbeidsdager(2, true, 5)).toEqual({ key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_LOW });
  });

  it('should verify that there is an to low error when required and dager is above maximum', () => {
    expect(validateArbeidsdager(12, true, 5, 10)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_TOO_HIGH
    });
  });

  it('should verify that there is not an to low error when required and dager is equal to minimum', () => {
    expect(validateArbeidsdager(5, true, 5)).toBeUndefined();
  });

  it('should verify that there is not an error when required and dager is equal to maximum', () => {
    expect(validateArbeidsdager(10, true, 5, 10)).toBeUndefined();
  });

  it('should verify that string with numbers and string returns an error when required', () => {
    // @ts-expect-error   Skal ikke være mulig, men sjekker like vel
    expect(validateArbeidsdager('0a', true)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING
    });
  });

  it('should verify that string with numbers as text returns an error when required', () => {
    // @ts-expect-error   Skal ikke være mulig, men sjekker like vel
    expect(validateArbeidsdager('tohundre', true)).toEqual({
      key: ValidateArbeidsdagerKeys.VALIDATE_ARBEIDSDAGER_MISSING
    });
  });
});
