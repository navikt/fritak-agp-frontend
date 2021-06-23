import validateAntallPerioder, { ValidateAntallPerioderKeys } from './validateAntallPerioder';

describe('validateAntallPerioder', () => {
  it('should verify that there is a dager when required', () => {
    expect(validateAntallPerioder(123, true)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateAntallPerioder(123, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required', () => {
    expect(validateAntallPerioder(undefined, true)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_MISSING
    });
  });

  it('should not verify that there is a dager missing when not required', () => {
    expect(validateAntallPerioder(undefined, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required and dager is 0', () => {
    expect(validateAntallPerioder(0, true)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_MISSING
    });
  });

  it('should return undefined when not required and dager is 0', () => {
    expect(validateAntallPerioder(0, false)).toBeUndefined();
  });

  it('should verify that there is an to low error when required and dager is below minimum', () => {
    expect(validateAntallPerioder(2, true, 5)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_LOW
    });
  });

  it('should verify that there is an to low error when required and dager is above maximum', () => {
    expect(validateAntallPerioder(12, true, 5, 10)).toEqual({
      key: ValidateAntallPerioderKeys.VALIDATE_ANTALL_PERIODER_TOO_HIGH
    });
  });
});
