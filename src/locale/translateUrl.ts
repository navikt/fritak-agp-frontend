import { Language } from './Language';

export const translateUrl = (pathToTranslate: string, locale: string) => {
  const translateToLang = pathToTranslate.indexOf('/' + Language.en + '/') > -1 ? Language.en : Language.nb;
  return pathToTranslate.replace('/' + translateToLang + '/', '/' + locale + '/');
};
