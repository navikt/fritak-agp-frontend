import { isFuture } from './isFuture';

describe('isFuture', () => {
  it('should throw exception when invalid month', () => {
    expect(isFuture(2000, -1, 2000, 1)).toThrow('Invalid month!');
  });
  it('should throw exception when invalid month', () => {
    expect(isFuture(2000, 11, 2000, 1)).toThrow('Invalid month!');
  });

  it('should be future when date is next month', () => {
    expect(isFuture(2000, 0, 2000, 1)).toBe(false);
  });

  it('should not be future when date is previous month', () => {
    expect(isFuture(2000, 1, 2000, 0)).toBe(true);
  });

  it('should not be future when date is current month', () => {
    expect(isFuture(2000, 0, 2000, 0)).toBe(false);
  });
});
