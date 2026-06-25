import { redirectUrl } from './redirectUrl';

describe('redirectUrl', () => {
  it('should replace XXX with the provided href', () => {
    const loginServiceUrl = 'https://login.nav.no/oauth2/login?redirect=XXX';
    const href = 'https://arbeidsgiver.nav.no/fritak-agp/';
    const result = redirectUrl(loginServiceUrl, href);
    expect(result).toBe('https://login.nav.no/oauth2/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/');
  });

  it('should not modify the URL when XXX is not present', () => {
    const loginServiceUrl = 'https://login.nav.no/oauth2/login';
    const href = 'https://arbeidsgiver.nav.no/fritak-agp/';
    const result = redirectUrl(loginServiceUrl, href);
    expect(result).toBe(loginServiceUrl);
  });

  it('should only replace the first occurrence of XXX', () => {
    const loginServiceUrl = 'https://login.nav.no/XXX/oauth2/login?redirect=XXX';
    const href = 'https://example.com/path';
    const result = redirectUrl(loginServiceUrl, href);
    expect(result).toBe('https://login.nav.no/https://example.com/path/oauth2/login?redirect=XXX');
  });

  it('should work with an empty href', () => {
    const loginServiceUrl = 'https://login.nav.no/oauth2/login?redirect=XXX';
    const result = redirectUrl(loginServiceUrl, '');
    expect(result).toBe('https://login.nav.no/oauth2/login?redirect=');
  });
});
