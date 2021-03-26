import i18n from 'i18next';
import { Languages, translationsToJson } from './utils';

i18n.init({
  resources: {
    nb: {
      translations: translationsToJson(Languages.nb)
    }
  },
  fallbackLng: Languages.nb,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;
