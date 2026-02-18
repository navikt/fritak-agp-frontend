import React, { createContext, useState, useMemo, PropsWithChildren, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { Language } from '../../locale/Language';
import buildResources from '../../locale/buildResources';
import { Locale } from '../../locale/Locales';
import { autodetectLanguage } from '../../locale/autodetectLanguage';
import { translateUrl } from '../../locale/translateUrl';
import type { i18n } from 'i18next';

interface LanguageContextInterface {
  language: string;
  i18n: i18n;
}

const LanguageContext = createContext({
  language: 'nb'
} as LanguageContextInterface);

interface LanguageContextProviderProps {
  languages: Array<string>;
  i18n: i18n;
  bundle: Record<string, Locale>;
}

const LanguageProvider = (props: PropsWithChildren<LanguageContextProviderProps>) => {
  const href = window.location.pathname;
  const i18n = props.i18n;
  const [language] = useState<string>(autodetectLanguage(href));
  const resources = useMemo(() => buildResources(props.bundle), [props.bundle]);

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources,
      lng: 'nb',
      react: {
        useSuspense: false
      }
    });
  }, [i18n, resources]);

  useEffect(() => {
    setAvailableLanguages(
      props.languages.map((l) => ({
        locale: Language[l],
        url: '/' + l + '/',
        handleInApp: true
      }))
    );

    const unsubscribe = onLanguageSelect((language) => {
      i18n.changeLanguage(language.locale);
      const href = window.location.pathname;
      window.history.pushState({}, 'Title', translateUrl(href, language.locale) + window.location.search);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [i18n, props.languages]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

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
