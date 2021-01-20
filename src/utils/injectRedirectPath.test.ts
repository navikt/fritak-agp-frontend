import injectRedirectPath from './injectRedirectPath';

import env from '../environment';

const mockServer =
  'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/?loggedIn=true';

describe('injectRedirectPath', () => {
  it('should inject stuff', () => {
    jest.spyOn(env, 'loginServiceUrl', 'get').mockReturnValue(mockServer);

    expect(injectRedirectPath('/path-part')).toEqual(
      'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/?loggedIn=true?redirect=https%3A%2F%2Farbeidsgiver.nav.no%2Ffritak-agp%2F%2Fpath-part%3FloggedIn%3Dtrue'
    );
  });

  it('should inject stuff but not the part we dont want', () => {
    jest.spyOn(env, 'loginServiceUrl', 'get').mockReturnValue(mockServer);

    expect(injectRedirectPath('/fritak-agp/path-part', '/fritak-agp')).toEqual(
      'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/?loggedIn=true?redirect=https%3A%2F%2Farbeidsgiver.nav.no%2Ffritak-agp%2F%2Fpath-part%3FloggedIn%3Dtrue'
    );
  });

  it('should not inject if we dont have commas', () => {
    jest
      .spyOn(env, 'loginServiceUrl', 'get')
      .mockReturnValue('https://loginservice.nav.no/login/nocommas/for/you');

    expect(injectRedirectPath('/fritak-agp/path-part', '/fritak-agp')).toEqual(
      'https://loginservice.nav.no/login/nocommas/for/you?redirect=null'
    );
  });
});
