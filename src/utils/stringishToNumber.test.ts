import stringishToNumber from './stringishToNumber';

describe('stringishToNumber', () => {
  it('should return a number when input is string', () => {
    expect(stringishToNumber('123')).toBe(123);
  });

  it('should return a undefined when input is undefined', () => {
    expect(stringishToNumber(undefined)).toBeUndefined();
  });

  it('should return a number when input is string and 0', () => {
    expect(stringishToNumber('0')).toBe(0);
  });

  it('should return a undefined when input is empty string', () => {
    expect(stringishToNumber('')).toBeUndefined();
  });

  it('should return a undefined when input is undefined', () => {
    expect(stringishToNumber(undefined)).toBeUndefined();
  });

  it('should return a number when input is string big number', () => {
    expect(stringishToNumber('12 345,12')).toBe(12345.12);
  });
});
