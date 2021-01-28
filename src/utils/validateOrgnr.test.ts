import { validateOrgnr } from './validateOrgnr';
import testOrgnr from '../mockData/testOrgnr';

describe('validateOrgnr', () => {
  it('should not give error when valid fnr', async () => {
    expect(validateOrgnr(testOrgnr.GyldigeOrgnr.TestOrg1, true)).toBeUndefined();
  });
  it('should give error when undefined value and required', async () => {
    expect(validateOrgnr(undefined, true)).toEqual('Mangler organisasjonsnummer');
  });
  it('should give error when empty value and required', async () => {
    expect(validateOrgnr('', true)).toEqual('Mangler organisasjonsnummer');
  });

  it('should give error when invalid value and required', async () => {
    expect(validateOrgnr('123', true)).toEqual('Ugyldig organisasjonsnummer');
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
});
