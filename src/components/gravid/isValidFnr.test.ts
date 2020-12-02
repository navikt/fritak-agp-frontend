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
    const invalidFnr = testFnr.Ugyldige;

    const fnrKeys = Object.keys(invalidFnr);

    fnrKeys.forEach((key) => {
      expect(isValidFnr(invalidFnr[key])).toBeFalsy();
    });
  });
});
