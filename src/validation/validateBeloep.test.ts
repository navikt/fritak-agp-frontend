import validateBeloep from './validateBeloep';

describe('validateBeloep', () => {
  it('should verify that ther is a beloep when required', () => {
    expect(validateBeloep(123, true)).toBeUndefined();
  });

  it('should verify that there is a beloep and not required', () => {
    expect(validateBeloep(123, false)).toBeUndefined();
  });

  it('should verify that there is a beloep missing when required', () => {
    expect(validateBeloep(undefined, true)).not.toBeUndefined();
  });

  it('should not verify that there is a beloep missing when not required', () => {
    expect(validateBeloep(undefined, false)).toBeUndefined();
  });
});
