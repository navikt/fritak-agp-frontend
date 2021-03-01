import validateFra from './validateFra';
import { parseDato } from '../utils/Dato';

describe('validateFra', () => {
  it('should not show error when valid value and not required', () => {
    expect(validateFra(parseDato('01.02.2020'), true)).toBeUndefined();
  });

  it('should not show error when empty value and not required', () => {
    expect(validateFra(parseDato(''), false)).toBeUndefined();
  });

  it('should show error when empty value and required', () => {
    expect(validateFra(parseDato(''), true)).not.toBeUndefined();
  });

  it('should not show error when valid and required', () => {
    expect(validateFra(parseDato('05.10.2020'), true)).toBeUndefined();
  });

  it('should not show error when valid and not required', () => {
    expect(validateFra(parseDato('05.10.2020'), false)).toBeUndefined();
  });

  it('should show error when illegal dato', () => {
    expect(validateFra(parseDato('99.99.2020'), true)).not.toBeUndefined();
  });
});
