import validateDager from './validateDager';

describe('validateDager', () => {
  it('should verify that there is a dager when required', () => {
    expect(validateDager(123, true)).toBeUndefined();
  });

  it('should verify that there is a dager and not required', () => {
    expect(validateDager(123, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required', () => {
    expect(validateDager(undefined, true)).not.toBeUndefined();
  });

  it('should not verify that there is a dager missing when not required', () => {
    expect(validateDager(undefined, false)).toBeUndefined();
  });

  it('should verify that there is a dager missing when required and dager is 0', () => {
    expect(validateDager(undefined, true)).not.toBeUndefined();
  });
});
