import { parseISO } from 'date-fns';
import { validateFra, validateFraKeys } from './validateFra';

describe('validateFra', () => {
  const minDate = new Date(2021, 0, 29);

  it('should not show error when valid value and not required', () => {
    expect(validateFra(parseISO('2021-02-01'), minDate, true)).toBeUndefined();
  });

  it('should not show error when empty value and not required', () => {
    expect(validateFra(undefined, minDate, false)).toBeUndefined();
  });

  it('should show error when empty value and required', () => {
    expect(validateFra(undefined, minDate, true)).toEqual({ key: validateFraKeys.VALIDATE_FRA_MISSING });
  });

  it('should not show error when valid and required', () => {
    expect(validateFra(parseISO('2021-10-05'), minDate, true)).toBeUndefined();
  });

  it('should show errors when before earliest valid date', () => {
    expect(validateFra(parseISO('2021-01-28'), minDate, true)).toBeDefined();
  });

  it('should not show error when valid and not required', () => {
    expect(validateFra(parseISO('2021-10-05'), minDate, false)).toBeUndefined();
  });

  it('should show error when illegal dato', () => {
    expect(validateFra(new Date(NaN), minDate, true)).toEqual({ key: validateFraKeys.VALIDATE_FRA_FOM_ERROR });
  });

  it('distinguishes invalid input from an empty field', () => {
    expect(validateFra(undefined, minDate, true, 'invalid')).toEqual({ key: validateFraKeys.VALIDATE_FRA_FOM_ERROR });
    expect(validateFra(undefined, minDate, false, 'invalid')).toBeUndefined();
    expect(validateFra(undefined, minDate, true, 'beforeMin')?.key).toBe(validateFraKeys.VALIDATE_FRA_FOM_INVALID);
  });
});
