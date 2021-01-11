import { monthKey } from './monthKey';

describe('monthKey', () => {
  it('should throw exception when invalid month', () => {
    expect(() => {
      monthKey('Jannnuar');
    }).toThrow('Ugyldig måned');
  });

  it('should be future when date is next month', () => {
    expect(monthKey('Januar')).toBe('jan');
    expect(monthKey('Desember')).toBe('des');
  });
});
