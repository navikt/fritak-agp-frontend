import isNumericString from './isNumericString';

describe('isNumericString', () => {
  it('should return true for valid number', () => {
    expect(isNumericString('1234,50')).toBe(true);
  });

  it('should return true for other valid number', () => {
    expect(isNumericString('1234.50')).toBe(true);
  });

  it('should return false for invalid number', () => {
    expect(isNumericString('bananer')).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNumericString(undefined)).toBe(false);
  });

  it('should return false for too many decimals', () => {
    expect(isNumericString('12345,6789')).toBe(false);
  });

  it('should return false for too many digits', () => {
    expect(isNumericString('1234567890123456789012345')).toBe(false);
  });
});
