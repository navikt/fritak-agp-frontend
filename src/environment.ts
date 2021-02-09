export enum EnvironmentType {
  PROD,
  PREPROD_DEV, // Angir at man aksesserer preprod via naisdevice på *.dev.nav.no, kun tilgjengelig via naisdevice
  LOCAL
}

class Environment {
  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://loginservice.nav.no/login?redirect=XXX?loggedIn=true';
      case EnvironmentType.PREPROD_DEV:
        return 'https://fritakagp.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
      default:
        return 'https://fritakagp.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true';
    }
  }

  get basePath() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://fritakagp.nav.no/fritak-agp';
      case EnvironmentType.PREPROD_DEV:
        return 'https://fritakagp.dev.nav.no';
      default:
        return 'https://fritakagp.dev.nav.no';
    }
  }

  get environmentMode() {
    if (window.location.hostname === 'localhost') {
      return EnvironmentType.LOCAL;
    }
    if (window.location.hostname.indexOf('.dev.nav.no') > -1) {
      return EnvironmentType.PREPROD_DEV;
    }
    return EnvironmentType.PROD;
  }
}

const env = new Environment();

export default env;
