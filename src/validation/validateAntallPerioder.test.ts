import validateAntallPerioder, { ValidateAntallPerioderKeys } from './validateAntallPerioder';

describe('validateAntallPerioder', () => {
  it('should verify that there is a dager when required', () => {
    expect(validateAntallPerioder(123, true, false)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateAntallPerioder(123, false, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required', () => {
    expect(validateAntallPerioder(undefined, true, false)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_MISSING
    });
  });

  it('should not verify that there is a dager missing when not required', () => {
    expect(validateAntallPerioder(undefined, false, false)).toBeUndefined();
  });

  it('should return undefined when not required and dager is 0', () => {
    expect(validateAntallPerioder(0, false, false)).toBeUndefined();
  });

  it('should verify that there is an to low error when required and dager is below minimum', () => {
    expect(validateAntallPerioder(2, true, false, 5)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_LOW
    });
  });

  it('should verify that there is an to low error when required and dager is above maximum', () => {
    expect(validateAntallPerioder(12, true, false, 5, 10)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_HIGH
    });
  });

  it('should verify that there is not an error when required and dager is equal to minimum', () => {
    expect(validateAntallPerioder(5, true, false, 5)).toBeUndefined();
  });

  it('should verify that there is an to high error when required and dager is equal to maximum', () => {
    expect(validateAntallPerioder(10, true, false, 5, 10)).toBeUndefined();
  });

  it('should verify that there is not an error when required and dager is equal to minimum, using defaults', () => {
    expect(validateAntallPerioder(0, true, false)).toBeUndefined();
  });

  /*************** Med unntak ***************/
  it('should verify that there is an to high error when required and dager is equal to maximum, using defaults, with exception', () => {
    expect(validateAntallPerioder(366, true, true)).toBeUndefined();
  });

  it('should verify that there is a dager when required, with exception', () => {
    expect(validateAntallPerioder(123, true, true)).toBeUndefined();
  });

  it('should verify that there is a dager and not required, with exception', () => {
    expect(validateAntallPerioder(123, false, true)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required, with exception', () => {
    expect(validateAntallPerioder(undefined, true, true)).toBeUndefined();
  });

  it('should not verify that there is a dager missing when not required, with exception', () => {
    expect(validateAntallPerioder(undefined, false, true)).toBeUndefined();
  });

  it('should return undefined when not required and dager is 0, with exception', () => {
    expect(validateAntallPerioder(0, false, true)).toBeUndefined();
  });

  it('should verify that there is an to low error when required and dager is below minimum, with exception', () => {
    expect(validateAntallPerioder(2, true, true, 5)).toBeUndefined();
  });

  it('should verify that there is an to low error when required and dager is above maximum, with exception', () => {
    expect(validateAntallPerioder(12, true, true, 5, 10)).toBeUndefined();
  });

  it('should verify that there is not an error when required and dager is equal to minimum, with exception', () => {
    expect(validateAntallPerioder(5, true, true, 5)).toBeUndefined();
  });

  it('should verify that there is an to high error when required and dager is equal to maximum, with exception', () => {
    expect(validateAntallPerioder(10, true, true, 5, 10)).toBeUndefined();
  });

  it('should verify that there is not an error when required and dager is equal to minimum, using defaults, with exception', () => {
    expect(validateAntallPerioder(0, true, true)).toBeUndefined();
  });

  it('should verify that there is an to high error when required and dager is equal to maximum, using defaults, with exception', () => {
    expect(validateAntallPerioder(366, true, true)).toBeUndefined();
  });
});
