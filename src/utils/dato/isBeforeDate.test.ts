import isBeforeDate from './isBeforeDate';
import { Dato } from './Dato';

describe('isBeforeDate', () => {
  it('should return true when the dato is before the minDate', () => {
    const dato: Dato = { year: 2020, month: 1, day: 1 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should return false when the dato is after the minDate', () => {
    const dato: Dato = { year: 2022, month: 6, day: 15 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('should return false when the dato equals the minDate', () => {
    const dato: Dato = { year: 2021, month: 1, day: 1 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(false);
  });

  it('should handle missing year (defaults to 0)', () => {
    const dato: Dato = { month: 1, day: 1 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should handle missing month (defaults to 0)', () => {
    const dato: Dato = { year: 2020, day: 1 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should handle missing day (defaults to 1)', () => {
    const dato: Dato = { year: 2020, month: 6 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly when one day apart', () => {
    const dato: Dato = { year: 2021, month: 1, day: 1 };
    const minDate = new Date(2021, 0, 2);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly across month boundary', () => {
    const dato: Dato = { year: 2021, month: 3, day: 31 };
    const minDate = new Date(2021, 3, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });

  it('should compare correctly across year boundary', () => {
    const dato: Dato = { year: 2020, month: 12, day: 31 };
    const minDate = new Date(2021, 0, 1);
    expect(isBeforeDate(dato, minDate)).toBe(true);
  });
});
