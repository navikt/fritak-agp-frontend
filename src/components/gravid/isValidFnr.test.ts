import isValidFnr from './isValidFnr';
import testFnr from '../../mockData/testFnr';

describe('isValidFnr', () => {
  it('should return true for valid fødselsnummer', () => {
    const validFnr = testFnr.GyldigeFraDolly;

    const fnrKeys = Object.keys(validFnr);

    fnrKeys.forEach((key) => {
      expect(isValidFnr(validFnr[key])).toBeTruthy();
    });
  });

  it('should return false for invalid fødselsnummer', () => {
    const validFnr = testFnr.Ugyldige;

    const fnrKeys = Object.keys(validFnr);

    fnrKeys.forEach((key) => {
      expect(isValidFnr(validFnr[key])).toBeFalsy();
    });
  });
});
