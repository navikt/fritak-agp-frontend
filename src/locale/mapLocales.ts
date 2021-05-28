import Locales from './Locales';

const mapLocales = (lang: string) => {
  let allTranslatedKeys = {};
  Object.keys(Locales).forEach(
    (e) => (allTranslatedKeys[e] = Locales[e][lang])
  );
  return allTranslatedKeys;
};

export default mapLocales;
