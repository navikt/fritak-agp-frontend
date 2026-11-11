import { parseISO } from 'date-fns';
import { validateTermindato } from './validateTermindato';

describe('validateTermindato', () => {
  it('should not show error when valid value and not required', () => {
    expect(validateTermindato(parseISO('2020-02-01'), true, 'Termindato må fylles ut')).toBeUndefined();
  });

  it('should not show error when empty value and not required', () => {
    expect(validateTermindato(undefined, false, 'Termindato må fylles ut')).toBeUndefined();
  });

  it('should show error when empty value and required', () => {
    expect(validateTermindato(undefined, true, 'Termindato må fylles ut')).toBe('Termindato må fylles ut');
  });

  it('should not show error when valid and required', () => {
    expect(validateTermindato(parseISO('2020-10-05'), true, 'Termindato må fylles ut')).toBeUndefined();
  });

  it('should not show error when valid and not required', () => {
    expect(validateTermindato(parseISO('2020-10-05'), false, 'Termindato må fylles ut')).toBeUndefined();
  });

  it('should show error when illegal dato', () => {
    expect(validateTermindato(new Date(NaN), true, 'Termindato må fylles ut')).toBe('Ugyldig dato');
  });

  it('distinguishes invalid input from an empty field', () => {
    expect(validateTermindato(undefined, true, 'Påkrevd', 'invalid')).toBe('Ugyldig dato');
    expect(validateTermindato(undefined, false, 'Påkrevd', 'invalid')).toBeUndefined();
  });
});
