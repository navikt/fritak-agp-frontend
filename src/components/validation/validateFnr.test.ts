import { validateFnr } from './validateFnr';

describe('validateFnr', () => {
  it('should give error when undefined value and required', async () => {
    expect(validateFnr(undefined, true)).toEqual('Mangler fødselsnummer');
  });
  it('should give error when empty value and required', async () => {
    expect(validateFnr('', true)).toEqual('Mangler fødselsnummer');
  });

  it('should give error when invalid value and required', async () => {
    expect(validateFnr('123', true)).toEqual('Ugyldig fødselsnummer');
  });
  it('should not give error when invalid value and not required', async () => {
    expect(validateFnr('123', false)).toBeUndefined();
  });

  it('should not give error when not required and undefined value', async () => {
    expect(validateFnr(undefined, false)).toBeUndefined();
    expect(validateFnr(undefined)).toBeUndefined();
  });
  it('should not give error when not required and empty value', async () => {
    expect(validateFnr('', false)).toBeUndefined();
    expect(validateFnr('')).toBeUndefined();
  });
});
