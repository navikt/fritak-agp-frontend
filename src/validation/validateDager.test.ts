import validateDager, { ValidateDagerKeys } from './validateDager';

describe('validateDager', () => {
  it('should verify that there is a dager when required', () => {
    expect(validateDager(16, true)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateDager(16, false)).toBeUndefined();
  });

  it.each([true, false])('rejects more than 16 days with required=%s', (required) => {
    expect(validateDager(17, required)).toEqual({ key: ValidateDagerKeys.VALIDATE_DAGER_TOO_HIGH });
  });

  it('should verify that there is a dager missing when required', () => {
    expect(validateDager(undefined, true)).toEqual({ key: 'VALIDATE_DAGER_MISSING' });
  });

  it('should not verify that there is a dager missing when not required', () => {
    expect(validateDager(undefined, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required and dager is 0', () => {
    expect(validateDager(0, true)).toEqual({ key: 'VALIDATE_DAGER_MISSING' });
  });
});
