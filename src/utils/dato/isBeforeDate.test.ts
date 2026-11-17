import isBeforeDate from './isBeforeDate';

describe('isBeforeDate', () => {
  it('should return true when the dato is before the minDate', () => {
    const dato = new Date(2020, 0, 1);
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should return false when the dato is after the minDate', () => {
    const dato = new Date(2022, 5, 15);
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('should return false when the dato equals the minDate', () => {
    const dato = new Date(2021, 0, 1);
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('ignores time within the same calendar day', () => {
    const dato = new Date(2021, 0, 1);
    const minDate = new Date(2021, 0, 1, 12);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('does not consider an invalid date before the minimum', () => {
    const dato = new Date(NaN);
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('compares calendar days across a daylight saving transition', () => {
    const dato = new Date(2025, 2, 29);
    const minDate = new Date(2025, 2, 30);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly when one day apart', () => {
    const dato = new Date(2021, 0, 1);
    const minDate = new Date(2021, 0, 2);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly across month boundary', () => {
    const dato = new Date(2021, 2, 31);
    const minDate = new Date(2021, 3, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly across year boundary', () => {
    const dato = new Date(2020, 11, 31);
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });
});
