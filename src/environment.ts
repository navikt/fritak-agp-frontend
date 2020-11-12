export enum EnvironmentType {
  PROD,
  PREPROD_DEV, // Angir at man aksesserer preprod via naisdevice på *.dev.nav.no, kun tilgjengelig via naisdevice
  LOCAL
}

class Environment {
  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/fritak-agp/';
      case EnvironmentType.PREPROD_DEV:
        return 'https://loginservice.dev.nav.no/login?redirect=https://fritakagp.dev.nav.no';
      default:
        return 'http://localhost:8080/local/cookie-please?subject=12321&redirect=http://localhost:3000/fritak-agp/';
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD:
        return 'https://fritakagp.nav.no/fritak-agp';
      case EnvironmentType.PREPROD_DEV:
        return 'https://fritakagp.dev.nav.no/fritak-agp';
      default:
        return 'http://localhost:3000/fritak-agp';
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
