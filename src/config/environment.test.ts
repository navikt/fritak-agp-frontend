import { describe, it, expect, vi, afterEach, type SpyInstance } from 'vitest';
import env from './environment';

/* @vitest-environment jsdom */

describe('umamiDataDomains', () => {
  let locationSpy: SpyInstance<[], Location> | undefined;

  const stubHostname = (hostname: string) => {
    // Cast via unknown to avoid using 'any' while fulfilling the expected Location type
    locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({ hostname } as unknown as Location);
  };

  afterEach(() => {
    locationSpy?.mockRestore();
  });

  it('returns arbeidsgiver.intern.dev.nav.no for localhost (LOCAL) - umamiDataDomains', () => {
    stubHostname('localhost');
    expect(env.umamiDataDomains).toBe('arbeidsgiver.intern.dev.nav.no');
  });

  it('returns arbeidsgiver.intern.dev.nav.no for .dev.nav.no (PREPROD_DEV) - umamiDataDomains', () => {
    stubHostname('arbeidsgiver.intern.dev.nav.no');
    expect(env.umamiDataDomains).toBe('arbeidsgiver.intern.dev.nav.no');
  });

  it('returns arbeidsgiver.nav.no for non-dev non-local (PROD) - umamiDataDomains', () => {
    stubHostname('arbeidsgiver.nav.no');
    expect(env.umamiDataDomains).toBe('arbeidsgiver.nav.no');
  });

  it('returns arbeidsgiver.intern.dev.nav.no for localhost (LOCAL) - umamiWebsiteId', () => {
    stubHostname('localhost');
    expect(env.umamiWebsiteId).toBe('914d6072-cc35-4d1c-b55e-0d875dbde5de');
  });

  it('returns arbeidsgiver.intern.dev.nav.no for .dev.nav.no (PREPROD_DEV) - umamiWebsiteId', () => {
    stubHostname('arbeidsgiver.intern.dev.nav.no');
    expect(env.umamiWebsiteId).toBe('914d6072-cc35-4d1c-b55e-0d875dbde5de');
  });

  it('returns arbeidsgiver.nav.no for non-dev non-local (PROD) - umamiWebsiteId', () => {
    stubHostname('arbeidsgiver.nav.no');
    expect(env.umamiWebsiteId).toBe('a201252d-99a0-4497-a7d0-44e677f7dac1');
  });

  it('returns dev URL for localhost (LOCAL) - minSideArbeidsgiver', () => {
    stubHostname('localhost');
    expect(env.minSideArbeidsgiver).toBe(
      'https://arbeidsgiver.intern.dev.nav.no/min-side-arbeidsgiver/sak-restore-session'
    );
  });

  it('returns dev URL for .dev.nav.no (PREPROD_DEV) - minSideArbeidsgiver', () => {
    stubHostname('arbeidsgiver.intern.dev.nav.no');
    expect(env.minSideArbeidsgiver).toBe(
      'https://arbeidsgiver.intern.dev.nav.no/min-side-arbeidsgiver/sak-restore-session'
    );
  });

  it('returns prod URL for non-dev non-local (PROD) - minSideArbeidsgiver', () => {
    stubHostname('arbeidsgiver.nav.no');
    expect(env.minSideArbeidsgiver).toBe('https://arbeidsgiver.nav.no/min-side-arbeidsgiver/sak-restore-session');
  });

  it('returns local URL for localhost (LOCAL) - loginServiceUrl', () => {
    stubHostname('localhost');
    expect(env.loginServiceUrl).toBe(
      'http://localhost:3000/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true'
    );
  });

  it('returns dev URL for .dev.nav.no (PREPROD_DEV) - loginServiceUrl', () => {
    stubHostname('arbeidsgiver.intern.dev.nav.no');
    expect(env.loginServiceUrl).toBe('https://arbeidsgiver.intern.dev.nav.no/fritak-agp/oauth2/login?redirect=XXX');
  });

  it('returns prod URL for non-dev non-local (PROD) - loginServiceUrl', () => {
    stubHostname('arbeidsgiver.nav.no');
    expect(env.loginServiceUrl).toBe('https://arbeidsgiver.nav.no/fritak-agp/oauth2/login?redirect=XXX');
  });

  it('returns local URL for localhost (LOCAL) - logoutServiceUrl', () => {
    stubHostname('localhost');
    expect(env.logoutServiceUrl).toBe('http://localhost:3000/not-in-use');
  });

  it('returns dev URL for .dev.nav.no (PREPROD_DEV) - logoutServiceUrl', () => {
    stubHostname('arbeidsgiver.intern.dev.nav.no');
    expect(env.logoutServiceUrl).toBe('https://arbeidsgiver.intern.dev.nav.no/fritak-agp/oauth2/logout');
  });

  it('returns prod URL for non-dev non-local (PROD) - logoutServiceUrl', () => {
    stubHostname('arbeidsgiver.nav.no');
    expect(env.logoutServiceUrl).toBe('https://arbeidsgiver.nav.no/fritak-agp/oauth2/logout');
  });
});
