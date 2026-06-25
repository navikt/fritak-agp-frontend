import injectRedirectPath from './injectRedirectPath';
import { Language } from '../locale/Language';

describe('injectRedirectPath', () => {
  it('should replace XXX with the full redirect URL using window.location.origin', () => {
    const loginUrl = 'https://login.nav.no/oauth2/login?redirect=XXX';
    const result = injectRedirectPath(loginUrl, '/min-side', Language.nb);
    expect(result).not.toContain('XXX');
    expect(result).toContain('/fritak-agp/min-side');
  });

  it('should replace :language with the provided Norwegian language', () => {
    const loginUrl = 'https://login.nav.no/:language/oauth2/login?redirect=XXX';
    const result = injectRedirectPath(loginUrl, '/min-side', Language.nb);
    expect(result).toContain('/nb/');
    expect(result).not.toContain(':language');
  });

  it('should replace :language with the provided English language', () => {
    const loginUrl = 'https://login.nav.no/:language/oauth2/login?redirect=XXX';
    const result = injectRedirectPath(loginUrl, '/min-side', Language.en);
    expect(result).toContain('/en/');
    expect(result).not.toContain(':language');
  });

  it('should include the injected path in the redirect URL', () => {
    const loginUrl = 'https://login.nav.no/oauth2/login?redirect=XXX';
    const injectedPath = '/gravid/soknader';
    const result = injectRedirectPath(loginUrl, injectedPath, Language.nb);
    expect(result).toContain(injectedPath);
  });

  it('should include /fritak-agp baseUrl in the redirect URL', () => {
    const loginUrl = 'https://login.nav.no/oauth2/login?redirect=XXX';
    const result = injectRedirectPath(loginUrl, '/path', Language.nb);
    expect(result).toContain('/fritak-agp/');
  });

  it('should handle both XXX and :language replacements in the same URL', () => {
    const loginUrl = 'https://login.nav.no/oauth2/:language/login?redirect=XXX';
    const result = injectRedirectPath(loginUrl, '/test', Language.en);
    expect(result).not.toContain('XXX');
    expect(result).not.toContain(':language');
    expect(result).toContain('/en/');
    expect(result).toContain('/fritak-agp/test');
  });
});
