import isValidOrgnr from './isValidOrgnr';
import testOrgnr from '../mockData/testOrgnr';

describe('isValidOrgnr', () => {
  it('should return true for valid orgnummer', () => {
    const validOrgnr = testOrgnr.GyldigeOrgnr;
    const orgnrKeys = Object.keys(testOrgnr.GyldigeOrgnr);

    orgnrKeys.forEach((key) => {
      expect(isValidOrgnr(validOrgnr[key])).toBeTruthy();
    });
  });

  it('should return false for invalid orgnummer', () => {
    const invalidOrgnr = testOrgnr.Ugyldige;
    const orgnrKeys = Object.keys(testOrgnr.Ugyldige);

    orgnrKeys.forEach((key) => {
      expect(isValidOrgnr(invalidOrgnr[key])).toBeFalsy();
    });
  });
});
