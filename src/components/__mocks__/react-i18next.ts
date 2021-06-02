export const useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () =>
        new Promise(() => {
          return true;
        }),
      t: (str: string) => str
    }
  };
};
