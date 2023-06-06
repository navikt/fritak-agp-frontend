import { Languages } from './Languages';

export const translateUrl = (pathToTranslate: string, locale: string) => {
  const translateToLang = pathToTranslate.indexOf('/' + Languages.En + '/') > -1 ? Languages.En : Languages.Nb;
  return pathToTranslate.replace('/' + translateToLang + '/', '/' + locale + '/');
};
