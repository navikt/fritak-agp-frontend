import React, { createContext, useState, useMemo, PropsWithChildren } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import Language from '../../locale/Language';
import buildResources from '../../locale/buildResources';
import { Locale } from '../../locale/Locales';
import { autodetectLanguage } from '../../locale/autodetectLanguage';
import { translateUrl } from '../../locale/translateUrl';

export interface LanguageParams {
  language: Language;
}

interface LanguageContextInterface {
  language: string;
  i18n: any;
}

const LanguageContext = createContext({
  language: 'nb'
} as LanguageContextInterface);

interface LanguageContextProviderProps {
  languages: Array<string>;
  i18n: any;
  bundle: Record<string, Locale>;
}

const LanguageProvider = (props: PropsWithChildren<LanguageContextProviderProps>) => {
  const href = window.location.pathname;
  const i18n = props.i18n;
  const [language] = useState<string>(autodetectLanguage(href));
  i18n.use(initReactI18next).init({
    resources: buildResources(props.bundle),
    lng: 'nb',
    react: {
      wait: true
    }
  });
  setAvailableLanguages(
    props.languages.map((l) => ({
      locale: Language[l],
      url: '/' + l + '/',
      handleInApp: true
    }))
  );
  onLanguageSelect((language) => {
    i18n.changeLanguage(language.locale);
    const href = window.location.pathname;
    window.history.pushState({}, 'Title', translateUrl(href, language.locale) + window.location.search);
  });
  i18n.changeLanguage(language);

  const initialValues = useMemo(
    () => ({
      language,
      i18n
    }),
    [language, i18n]
  );

  return (
    <LanguageContext.Provider value={initialValues}>
      <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};

export { LanguageProvider };
