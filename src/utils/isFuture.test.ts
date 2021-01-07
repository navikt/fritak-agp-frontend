import { isFuture } from './isFuture';
import { MONTHS } from './months';

describe('isFuture', () => {
  it('should be future when date is next month', () => {
    expect(isFuture(2000, MONTHS[0], 2000, 1)).toBe(false);
  });

  it('should not be future when date is previous month', () => {
    expect(isFuture(2000, MONTHS[1], 2000, 0)).toBe(true);
  });

  it('should not be future when date is current month', () => {
    expect(isFuture(2000, MONTHS[0], 2000, 0)).toBe(false);
  });
});
