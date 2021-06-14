import { i18n } from 'i18next';
import { buildResources, Language, Locale } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { initReactI18next } from 'react-i18next';

export const languageInit = (translate: i18n, lang: Language, bundle: Record<string, Locale>) => {
  translate.use(initReactI18next).init({
    resources: buildResources(bundle),
    lng: 'nb',
    react: {
      wait: true
    }
  });
  return translate;
};
