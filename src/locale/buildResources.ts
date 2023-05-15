import { Locale } from './Locales';

export type Translation = {
  translation: Record<string, any>;
};

const buildLanguage = (lang: string, bundle: Record<string, any>) => {
  const values = {};
  const keys = Object.keys(bundle);
  keys.forEach((k) => {
    values[k] = bundle[k][lang];
  });
  return values;
};

/**
 * Converts into i18next format
 *
 * @param bundle
 */
const buildResources = (bundle: Record<string, Locale>): Record<string, any> => {
  return {
    en: {
      translation: buildLanguage('en', bundle)
    },
    nb: {
      translation: buildLanguage('nb', bundle)
    }
  };
};

export default buildResources;
