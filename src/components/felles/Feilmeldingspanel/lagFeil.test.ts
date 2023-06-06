import { lagFeil } from './lagFeil';

describe('lagFeil', () => {
  it('should return an feiloppsumerings object', () => {
    expect(lagFeil('felt', 'melding')).toEqual({
      skjemaelementId: 'felt',
      feilmelding: 'melding'
    });
  });
});
