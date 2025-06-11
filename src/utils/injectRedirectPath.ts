import environment from '../config/environment';
import { Language } from '../locale/Language';

function injectRedirectPath(loginServiceUrl: string, injectedPath: string, lang: Language): string {
  const host = window.location.origin;
  const injectedUrl = loginServiceUrl.replace('XXX', host + environment.baseUrl + injectedPath);
  return injectedUrl.replace(':language', lang);
}

export default injectRedirectPath;
