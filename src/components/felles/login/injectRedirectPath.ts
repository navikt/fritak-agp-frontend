import env from '../../../config/environment';

function injectRedirectPath(injectedPath: string, clean: string = ''): string {
  let url = new URL(env.loginServiceUrl);
  let params = new URLSearchParams(url.search);
  let redirect = params.get('redirect');

  if (!!clean) {
    injectedPath = injectedPath.replace(clean, '');
  }

  const redirectParts = redirect?.split('?');

  const redir =
    redirectParts && redirectParts?.length > 1 ? redirectParts[0] + injectedPath + '?' + redirectParts[1] : redirect;

  params.set('redirect', redir || redirect + '');

  return url.href + '?' + params.toString();
}

export default injectRedirectPath;
