import { parseDato } from '../utils/dato/Dato';
import { validateFra } from './validateFra';

describe('validateFra', () => {
  const minDate = new Date(2021, 0, 29);

  it('should not show error when valid value and not required', () => {
    expect(validateFra(parseDato('01.02.2021'), minDate, true)).toBeUndefined();
  });

  it('should not show error when empty value and not required', () => {
    expect(validateFra(parseDato(''), minDate, false)).toBeUndefined();
  });

  it('should show error when empty value and required', () => {
    expect(validateFra(parseDato(''), minDate, true)).toBeDefined();
  });

  it('should not show error when valid and required', () => {
    expect(validateFra(parseDato('05.10.2021'), minDate, true)).toBeUndefined();
  });

  it('should show errors when before earliest valid date', () => {
    expect(validateFra(parseDato('28.01.2021'), minDate, true)).toBeDefined();
  });

  it('should not show error when valid and not required', () => {
    expect(validateFra(parseDato('05.10.2021'), minDate, false)).toBeUndefined();
  });

  it('should show error when illegal dato', () => {
    expect(validateFra(parseDato('99.99.2021'), minDate, true)).toBeDefined();
  });
});
