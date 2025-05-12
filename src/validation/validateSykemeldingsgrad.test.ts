import validateSykemeldingGrad, { validateSykemeldingGradKeys } from './validateSykemeldingsgrad';

describe('validateSykemeldingGrad', () => {
  it('should not require anything', () => {
    expect(validateSykemeldingGrad('', true)).toBeUndefined();
  });

  it('should not show error when not required on 10%', () => {
    expect(validateSykemeldingGrad('10%', false)).toBeUndefined();
  });

  it('should show error when below 10%', () => {
    expect(validateSykemeldingGrad('10%', true)).toEqual({
      key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW
    });
  });

  it('should not show error when not required on 10', () => {
    expect(validateSykemeldingGrad('10', false)).toBeUndefined();
  });

  it('should show error required and 10', () => {
    expect(validateSykemeldingGrad('10', true)).toEqual({
      key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW
    });
  });

  it('should not show error not required and 25%', () => {
    expect(validateSykemeldingGrad('25%', true)).toBeUndefined();
  });

  it('should not show error when required and 25%', () => {
    expect(validateSykemeldingGrad('25', false)).toBeUndefined();
  });

  it('should not show error when not required and 25', () => {
    expect(validateSykemeldingGrad('25', true)).toBeUndefined();
  });

  it('should not show error when not required and 25%', () => {
    expect(validateSykemeldingGrad('25%', false)).toBeUndefined();
  });

  it('should not show error required and 100', () => {
    expect(validateSykemeldingGrad('100', true)).toBeUndefined();
  });

  it('should show error when required and 110', () => {
    expect(validateSykemeldingGrad('110', true)).toEqual({
      key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH
    });
  });

  it('should show error when required and 110%', () => {
    expect(validateSykemeldingGrad('110%', true)).toEqual({
      key: validateSykemeldingGradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH
    });
  });
});
