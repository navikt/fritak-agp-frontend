import mapArbeidsgiver from './mapArbeidsgiver';
import testBackendOrganisasjoner from '../../mock/testBackendOrganisasjoner';
import testOrganisasjoner from '../../mock/testOrganisasjoner';

describe('mapArbeidsgiver', () => {
  it('should map backend data to something useable', () => {
    expect(mapArbeidsgiver(testBackendOrganisasjoner)).toEqual(testOrganisasjoner);
  });
});
