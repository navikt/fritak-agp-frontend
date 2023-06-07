import formatISO from './formatISO';

describe('formatISO', () => {
  it('should return undefined when param is undefined', () => {
    expect(formatISO(undefined)).toBeUndefined();
  });

  it('should return the correct date in ISO format', () => {
    expect(formatISO(new Date(2022, 2, 2))).toBe('2022-03-02');
  });
});
