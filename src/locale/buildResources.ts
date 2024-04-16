import { Locale } from './Locales';

export interface Translation {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  translation: Record<string, any>;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
