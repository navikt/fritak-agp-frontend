import { Language } from './Language';

export const autodetectLanguage = (url: string): Language => {
  return url.indexOf('/' + Language.en + '/') > -1 ? Language.en : Language.nb;
};
