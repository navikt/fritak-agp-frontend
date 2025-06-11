import { i18n } from 'i18next';
import buildResources from './buildResources';
import { initReactI18next } from 'react-i18next';
import { Language } from './Language';
import { Locale } from './Locales';

export const languageInit = (translate: i18n, lang: Language, bundle: Record<string, Locale>) => {
  translate.use(initReactI18next).init({
    resources: buildResources(bundle),
    lng: 'nb',
    react: {
      useSuspense: true
    }
  });
  return translate;
};
