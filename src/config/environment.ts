export enum EnvironmentType {
  PROD,
  PREPROD_DEV, // Angir at man aksesserer preprod via naisdevice på *.dev.nav.no, kun tilgjengelig via naisdevice
  LOCAL,
  TESTCAFE
}

class Environment {
  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://arbeidsgiver.nav.no/fritak-agp/oauth2/login?redirect=XXX';
      case EnvironmentType.PREPROD_DEV:
        return 'https://arbeidsgiver.intern.dev.nav.no/fritak-agp/oauth2/login?redirect=XXX';
      case EnvironmentType.TESTCAFE:
        return 'http://localhost:3000/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
      default:
        return 'http://localhost:3000/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
    }
  }

  get logoutServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://arbeidsgiver.nav.no/fritak-agp/oauth2/logout';
      case EnvironmentType.PREPROD_DEV:
        return 'https://arbeidsgiver.intern.dev.nav.no/fritak-agp/oauth2/logout';
      case EnvironmentType.TESTCAFE:
        return 'http://localhost:3000/not-in-use';
      default:
        return 'http://localhost:3000/not-in-use';
    }
  }

  get baseUrl() {
    return '/fritak-agp';
  }

  get environmentMode() {
    if (this.isTestCafeRunning()) {
      return EnvironmentType.TESTCAFE;
    }
    if (window.location.hostname === 'localhost') {
      return EnvironmentType.LOCAL;
    }
    if (window.location.hostname.indexOf('.dev.nav.no') > -1) {
      return EnvironmentType.PREPROD_DEV;
    }
    return EnvironmentType.PROD;
  }

  get grunnbeloepUrl() {
    if (this.environmentMode === EnvironmentType.TESTCAFE) {
      return 'http://localhost:3000/api/v1/grunnbeloep';
    }

    return 'https://g.nav.no/api/v1/grunnbeloep';
    // https://g.nav.no/api/v1/grunnbeloep?dato=2020-02-12 hvis man trenger å spørre på dato
  }

  private isTestCafeRunning() {
    const urlParams = new URLSearchParams(window.location.search);
    const testCafe = urlParams.get('TestCafe');

    return testCafe === 'running';
  }
}

const env = new Environment();

export default env;
