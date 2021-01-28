import { validateTil } from './validateTil';
import { parseDato } from '../../utils/Dato';

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
});
