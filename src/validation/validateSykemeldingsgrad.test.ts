import validateSykemeldingsgrad from './validateSykemeldingsgrad';
import { ValidateSykemeldingsgradKeys } from './validateSykemeldingsgrad'

describe('validateSykemeldingsgrad', () => {
  it('should not require anything', () => {
    expect(validateSykemeldingsgrad('', true)).toBeUndefined();
  });

  it('should not show error when not required on 10%', () => {
    expect(validateSykemeldingsgrad('10%', false)).toBeUndefined();
  });

  it('should show error when below 10%', () => {
    expect(validateSykemeldingsgrad('10%', true)).toEqual({key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW});
  });

  it('should not show error when not required on 10', () => {
    expect(validateSykemeldingsgrad('10', false)).toBeUndefined();
  });

  it('should show error required and 10', () => {
    expect(validateSykemeldingsgrad('10', true)).toEqual({key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_LOW});
  });

  it('should not show error not required and 25%', () => {
    expect(validateSykemeldingsgrad('25%', true)).toBeUndefined();
  });

  it('should not show error when required and 25%', () => {
    expect(validateSykemeldingsgrad('25', false)).toBeUndefined();
  });

  it('should not show error when not required and 25', () => {
    expect(validateSykemeldingsgrad('25', true)).toBeUndefined();
  });

  it('should not show error when not required and 25%', () => {
    expect(validateSykemeldingsgrad('25%', false)).toBeUndefined();
  });

  it('should not show error required and 100', () => {
    expect(validateSykemeldingsgrad('100', true)).toBeUndefined();
  });

  it('should show error when required and 110', () => {
    expect(validateSykemeldingsgrad('110', true)).toEqual({key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH});
  });

  it('should show error when required and 110%', () => {
    expect(validateSykemeldingsgrad('110%', true)).toEqual({key: ValidateSykemeldingsgradKeys.VALIDATE_SYKEMELDINGSGRAD_HIGH});
  });
});
