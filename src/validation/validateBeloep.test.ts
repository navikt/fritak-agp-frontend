import validateBeloep from './validateBeloep';

describe('validateBeloep', () => {
  it('should verify that ther is a beloep when required', () => {
    expect(validateBeloep('123', 1000, true)).toBeUndefined();
  });

  it('should verify that there is a beloep and not required', () => {
    expect(validateBeloep('123', 1000, false)).toBeUndefined();
  });

  it('should verify that there beløp is valid', () => {
    expect(validateBeloep('123', 123, true)).toBeUndefined();
  });

  it('should verify that there beløp is invalid when belop is higher than max', () => {
    expect(validateBeloep('123', 122, true)).not.toBeUndefined();
  });

  it('should verify that there is a beloep missing when required', () => {
    expect(validateBeloep(undefined, 1000, true)).not.toBeUndefined();
  });

  it('should return an error if beloep is not numeric', () => {
    expect(validateBeloep('money', 122, true)).not.toBeUndefined();
    expect(validateBeloep('money', 122, true)?.key).toBe('VALIDATE_BELOEP_AMOUNT_NOT_NUMERIC');
  });

  it('should return an error when beloep is missing and required', () => {
    expect(validateBeloep(undefined, 1000, true)).not.toBeUndefined();
    expect(validateBeloep(undefined, 122, true)?.key).toBe('VALIDATE_BELOEP_AMOUNT_MISSING');
  });

  it('should return undefined when beloep is missing and not required', () => {
    expect(validateBeloep(undefined, 1000, false)).toBeUndefined();
  });

  it('should return an error if beloep is not numeric and not required', () => {
    expect(validateBeloep('money', 122, false)).toBeUndefined();
  });

  it('should return an error when beloep is missing and not required', () => {
    expect(validateBeloep(undefined, 1000, false)).toBeUndefined();
  });

  it('should verify that there beløp is valid and not required', () => {
    expect(validateBeloep('123', 122, false)).toBeUndefined();
  });

  it('should verify that there beløp is valid required is not included as param', () => {
    expect(validateBeloep('123', 122)).toBeUndefined();
  });
});
