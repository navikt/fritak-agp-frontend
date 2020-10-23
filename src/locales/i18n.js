import i18n from 'i18next';
import { Languages, translationsToJson } from './keys';

i18n.init({
  resources: {
    nb: {
      translations: translationsToJson(Languages.nb)
    },
    nn: {
      translations: translationsToJson(Languages.nn)
    },
    en: {
      translations: translationsToJson(Languages.en)
    },
  },
  fallbackLng: Languages.nb,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },
  react: {
    wait: true
  },
});

export default i18n;
