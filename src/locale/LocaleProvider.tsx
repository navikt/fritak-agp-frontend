import i18n from 'i18next';
import mapLocales from './mapLocales';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import { useParams } from 'react-router-dom';
import Language from './Language';
import {
  setAvailableLanguages,
  setParams,
} from '@navikt/nav-dekoratoren-moduler';
import PathParams from './PathParams';

interface LocaleProviderProps {
  lang?: Language;
  children: any;
}

export const languageInit = (lang: Language) => {
  i18n.init({
    resources: {
      nb: {
        translations: mapLocales(Language.nb),
      },
      en: {
        translations: mapLocales(Language.en),
      },
    },
    fallbackLng: Language.nb,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });
  i18n.changeLanguage(lang);
  return i18n;
};

const LocaleProvider = ({
  children,
  lang = Language.nb,
}: LocaleProviderProps) => {
  let { language } = useParams<PathParams>();
  // const locale = useLocale(); Bruk useLocale
  const newLocationNO = '/fritak-agp/nb/innsending' + location.search;
  const newLocationEN = '/fritak-agp/en/innsending' + location.search;
  setAvailableLanguages([
    { locale: Language.nb, url: newLocationNO },
    { locale: Language.en, url: newLocationEN },
  ]);
  setParams({
    language: language,
  });
  languageInit(language);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LocaleProvider;
