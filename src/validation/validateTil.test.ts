import { validateTil } from './validateTil';
import { parseDato } from '../utils/dato/Dato';

describe('validateTil', () => {
  it('should not show errors when valid', () => {
    expect(validateTil(parseDato('01.02.2020'), parseDato('03.04.2020'), false)).toBeUndefined();
    expect(validateTil(parseDato('01.02.2020'), parseDato('03.04.2020'), true)).toBeUndefined();
  });

  it('should show errors when errors in dates', () => {
    expect(validateTil(parseDato('aa.02.2020'), parseDato('03.04.2020'), true)).not.toBeUndefined();
    expect(validateTil(parseDato('01.02.2020'), parseDato('aa.04.2020'), true)).not.toBeUndefined();
  });

  it('should show errors when tom is before fom', () => {
    expect(validateTil(parseDato('03.04.2020'), parseDato('01.02.2020'), true)).not.toBeUndefined();
  });

  it('should not show errors when valid and equal dates', () => {
    expect(validateTil(parseDato('01.02.2020'), parseDato('01.02.2020'), false)).toBeUndefined();
    expect(validateTil(parseDato('01.02.2020'), parseDato('01.02.2020'), true)).toBeUndefined();
  });

  it('should not show errors when fra is undefined', () => {
    expect(validateTil(undefined, parseDato('03.04.2020'), true)).toBeUndefined();
  });

  it('should not show errors when til is undefined and not required', () => {
    expect(validateTil(parseDato('03.04.2020'), undefined, false)).toBeUndefined();
  });

  it('should show error when til is undefined', () => {
    expect(validateTil(parseDato('03.04.2020'), undefined, true)).not.toBeUndefined();
  });
});
