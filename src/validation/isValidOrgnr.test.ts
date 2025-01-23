import isValidOrgnr from './isValidOrgnr';
import testOrgnr from '../mock/testOrgnr';

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

  it('should return true for another valid orgnummer', () => {
    expect(isValidOrgnr('315587336')).toBeTruthy();
  });
});
