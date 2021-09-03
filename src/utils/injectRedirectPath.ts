import Language from '@navikt/helse-arbeidsgiver-felles-frontend/dist/locale/Language';

function injectRedirectPath(loginServiceUrl: string, injectedPath: string, lang: Language): string {
  const host = window.location.origin;
  const injectedUrl = loginServiceUrl.replace('XXX', host + injectedPath);
  return injectedUrl.replace(':language', lang);
}

export default injectRedirectPath;
