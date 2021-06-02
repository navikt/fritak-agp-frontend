import { parseDato } from '../utils/dato/Dato';
import { validateTermindato } from './validateTermindato';

describe('validateTermindato', () => {
  it('should not show error when valid value and not required', () => {
    expect(validateTermindato(parseDato('01.02.2020'), true)).toBeUndefined();
  });

  it('should not show error when empty value and not required', () => {
    expect(validateTermindato(parseDato(''), false)).toBeUndefined();
  });

  it('should show error when empty value and required', () => {
    expect(validateTermindato(parseDato(''), true)).not.toBeUndefined();
  });

  it('should not show error when valid and required', () => {
    expect(validateTermindato(parseDato('05.10.2020'), true)).toBeUndefined();
  });

  it('should not show error when valid and not required', () => {
    expect(validateTermindato(parseDato('05.10.2020'), false)).toBeUndefined();
  });

  it('should show error when illegal dato', () => {
    expect(validateTermindato(parseDato('99.99.2020'), true)).not.toBeUndefined();
  });
});
