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
        return 'https://loginservice.nav.no/login?redirect=XXX?loggedIn=true';
      case EnvironmentType.PREPROD_DEV:
        return 'https://fritakagp.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
      case EnvironmentType.TESTCAFE:
        return 'http://localhost:3000/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
      default:
        return 'https://fritakagp.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://arbeidsgiver.nav.no/fritak-agp-api';
      case EnvironmentType.PREPROD_DEV:
        return 'https://fritakagp.dev.nav.no';
      case EnvironmentType.TESTCAFE:
        return 'http://localhost:3000';
      default:
        return 'https://fritakagp.dev.nav.no';
    }
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
