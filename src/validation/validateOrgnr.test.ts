import { validateOrgnr } from './validateOrgnr';
import testOrgnr from '../mock/testOrgnr';

describe('validateOrgnr', () => {
  it('should not give error when valid fnr', async () => {
    expect(validateOrgnr(testOrgnr.GyldigeOrgnr.TestOrg1, true)).toBeUndefined();
  });
  it('should give error when undefined value and required', async () => {
    expect(validateOrgnr(undefined, true)?.key).toBe('VALIDATE_ORGNR_MISSSING');
  });
  it('should give error when empty value and required', async () => {
    expect(validateOrgnr('', true)?.key).toBe('VALIDATE_ORGNR_MISSSING');
  });
  it('should give error when invalid value and required', async () => {
    expect(validateOrgnr('123', true)?.key).toBe('VALIDATE_ORGNR_INVALID');
  });
  it('should not give error when invalid value and not required', async () => {
    expect(validateOrgnr('123', false)).toBeUndefined();
  });
  it('should not give error when not required and undefined value', async () => {
    expect(validateOrgnr(undefined, false)).toBeUndefined();
    expect(validateOrgnr()).toBeUndefined();
  });
  it('should not give error when not required and empty value', async () => {
    expect(validateOrgnr('', false)).toBeUndefined();
    expect(validateOrgnr('')).toBeUndefined();
  });

  it('should not give error when the orgnr is valid and required', async () => {
    expect(validateOrgnr(testOrgnr.GyldigeOrgnr.TestOrg1, true)).toBeUndefined();
    expect(validateOrgnr(testOrgnr.GyldigeOrgnr.TestOrg1)).toBeUndefined();
  });
});
