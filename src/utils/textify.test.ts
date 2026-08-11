import textify from './textify';

describe('textify', () => {
  it('should return a string value unchanged', () => {
    expect(textify('hello')).toBe('hello');
  });

  it('should return an empty string unchanged', () => {
    expect(textify('')).toBe('');
  });

  it('should return a number as-is', () => {
    expect(textify(42)).toBe(42);
  });

  it('should return undefined as-is', () => {
    expect(textify(undefined)).toBeUndefined();
  });

  it('should return null as-is', () => {
    expect(textify(null)).toBeNull();
  });

  it('should return an object as-is', () => {
    const obj = { key: 'value' };
    expect(textify(obj)).toBe(obj);
  });

  it('should return an array as-is', () => {
    const arr = [1, 2, 3];
    expect(textify(arr)).toBe(arr);
  });
});
