import { Languages } from './Languages';

export const autodetectLanguage = (url: string): Languages => {
  return url.indexOf('/' + Languages.En + '/') > -1 ? Languages.En : Languages.Nb;
};
