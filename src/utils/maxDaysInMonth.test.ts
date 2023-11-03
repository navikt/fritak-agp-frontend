import { maxDaysInMonth } from './maxDaysInMonth';

describe('TabellValidator', () => {
  it('should return correct maxDaysInMonth', () => {
    expect(maxDaysInMonth(2021, 1)).toBe(28);
  });
});
