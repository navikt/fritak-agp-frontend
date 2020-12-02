import env from './environment';

describe('Environment', () => {
  it('should return the loginservice url for localhost', () => {
    expect(env.loginServiceUrl).toBe(
      'http://localhost:3000/local/cookie-please?subject=12321&redirect=http://localhost:3000/fritak-agp/?loggedIn=true'
    );
  });

  it('should return the loginservice url for preprod dev', () => {
    delete window.location;
    window.location = new URL('https://www.dev.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice.dev.nav.no/login?redirect=https://fritakagp.dev.nav.no/?loggedIn=true'
    );
  });

  it('should return the loginservice url for prod', () => {
    delete window.location;
    window.location = new URL('https://www.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/?loggedIn=true'
    );
  });

  /*********/

  it('should return the baseUrl url for localhost', () => {
    delete window.location;
    window.location = new URL('http://localhost');

    expect(env.baseUrl).toBe('http://localhost:3001/fritak-agp');
  });

  it('should return the baseUrl url for preprod dev', () => {
    delete window.location;
    window.location = new URL('https://www.dev.nav.no');

    expect(env.baseUrl).toBe('https://fritakagp.dev.nav.no/fritak-agp');
  });

  it('should return the baseUrl url for preprod q', () => {
    delete window.location;
    window.location = new URL('https://arbeidsgiver-q.nav.no');

    expect(env.baseUrl).toBe('https://fritakagp.nav.no/fritak-agp');
  });

  it('should return the baseUrl url for prod', () => {
    delete window.location;
    window.location = new URL('https://www.nav.no');

    expect(env.baseUrl).toBe('https://fritakagp.nav.no/fritak-agp');
  });
});
