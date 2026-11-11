import { parseISO } from 'date-fns';
import { validateTil, validateTilKeys } from './validateTil';

describe('validateTil', () => {
  const minDate = new Date(2021, 0, 29);

  it('should not show errors when valid', () => {
    expect(validateTil(parseISO('2021-02-01'), parseISO('2021-04-03'), minDate, false)).toBeUndefined();
    expect(validateTil(parseISO('2021-02-01'), parseISO('2021-04-03'), minDate, true)).toBeUndefined();
  });

  it('should show errors when errors in dates', () => {
    expect(validateTil(new Date(NaN), parseISO('2021-04-03'), minDate, true)).toBeDefined();
    expect(validateTil(parseISO('2021-02-01'), new Date(NaN), minDate, true)).toBeDefined();
  });

  it('should show errors when tom is before fom', () => {
    expect(validateTil(parseISO('2021-04-03'), parseISO('2021-02-01'), minDate, true)).toBeDefined();
  });

  it('should show errors when before earliest valid date', () => {
    expect(validateTil(parseISO('2021-01-28'), parseISO('2021-01-28'), minDate, true)).toBeDefined();
  });

  it('should not show errors when valid and equal dates', () => {
    expect(validateTil(parseISO('2021-02-01'), parseISO('2021-02-01'), minDate, false)).toBeUndefined();
    expect(validateTil(parseISO('2021-02-01'), parseISO('2021-02-01'), minDate, true)).toBeUndefined();
  });

  it('should not show errors when fra is undefined', () => {
    expect(validateTil(undefined, parseISO('2021-04-03'), minDate, true)).toBeUndefined();
  });

  it('should not show errors when til is undefined and not required', () => {
    expect(validateTil(parseISO('2021-04-03'), undefined, minDate, false)).toBeUndefined();
  });

  it('should show error when til is undefined', () => {
    expect(validateTil(parseISO('2021-04-03'), undefined, minDate, true)).toBeDefined();
  });

  it('distinguishes invalid and out-of-range input from an empty field', () => {
    expect(validateTil(undefined, undefined, minDate, true, 'invalid')).toEqual({
      key: validateTilKeys.VALIDATE_TIL_ERROR
    });
    expect(validateTil(undefined, undefined, minDate, true, 'beforeMin')?.key).toBe(
      validateTilKeys.VALIDATE_TIL_INVALID
    );
    expect(validateTil(undefined, undefined, minDate, true, 'afterMax')?.key).toBe(validateTilKeys.VALIDATE_TIL_ERROR);
  });
});
