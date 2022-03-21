import env from './environment';

const theWindowLocation = window.location;

describe('Environment', () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.location;
  });

  afterEach(() => {
    window.location = theWindowLocation;
    // @ts-ignore
    delete window.location;
  });

  it('should return the loginservice url for localhost', () => {
    window.location = theWindowLocation;

    expect(env.loginServiceUrl).toBe(
      'http://localhost:3000/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true'
    );
  });

  it('should return the loginservice url for preprod dev', () => {
    // @ts-ignore
    window.location = new URL('https://www.dev.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://fritakagp.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true'
    );
  });

  it('should return the loginservice url for prod', () => {
    // @ts-ignore
    window.location = new URL('https://www.nav.no');

    expect(env.loginServiceUrl).toBe('https://loginservice.nav.no/login?redirect=XXX?loggedIn=true');
  });

  it('should return the baseUrl url for localhost', () => {
    // @ts-ignore
    window.location = new URL('http://localhost');

    expect(env.baseUrl).toBe('http://localhost:3000');
  });

  it('should return the baseUrl url for preprod dev', () => {
    // @ts-ignore
    window.location = new URL('https://www.dev.nav.no');

    expect(env.baseUrl).toBe('https://fritakagp.dev.nav.no');
  });

  it('should return the baseUrl url for prod', () => {
    // @ts-ignore
    window.location = new URL('https://www.nav.no');

    expect(env.baseUrl).toBe('https://arbeidsgiver.nav.no/fritak-agp-api');
  });
});
