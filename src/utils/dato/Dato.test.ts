import { formatApiDate } from './Dato';

describe('formatApiDate', () => {
  it.each([
    { date: new Date(2025, 0, 1), expected: '2025-01-01' },
    { date: new Date(2024, 1, 29), expected: '2024-02-29' },
    { date: new Date(2025, 2, 30), expected: '2025-03-30' },
    { date: new Date(2025, 9, 26), expected: '2025-10-26' }
  ])('formats $expected without changing the date', ({ date, expected }) => {
    const timestamp = date.getTime();

    expect(formatApiDate(date)).toBe(expected);
    expect(date.getTime()).toBe(timestamp);
  });

  it.each([undefined, new Date(NaN)])('rejects missing or invalid dates: %s', (date) => {
    expect(() => formatApiDate(date)).toThrow('Gyldig dato må spesifiseres');
  });
});
