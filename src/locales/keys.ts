export enum Keys {
  TITLE = 'TITLE',
  DEN_ANSATTE = 'DEN_ANSATTE'
}

const translatedKeys: IncludedKeys = {
  [Keys.TITLE]: {
    nb: 'Tittel NB',
    nn: 'Tittel NN',
    en: 'Tittel EN'
  },

  [Keys.DEN_ANSATTE]: {
    nb: 'DEN_ANSATTE NB',
    nn: 'DEN_ANSATTE NN',
    en: 'DEN_ANSATTE EN'
  }
};

type IncludedKeys = {
  [P in Keys]: {
    [L in Languages]: string;
  };
};

const allTranslations: IncludedKeys = {
  ...translatedKeys
};

export enum Languages {
  nb = 'nb',
  nn = 'nn',
  en = 'en'
}

export const translationsToJson = (lan: Languages): {} => {
  let allTranslatedKeys = {};
  Object.keys(allTranslations).forEach((e) => (allTranslatedKeys[e] = allTranslations[e][lan]));
  return allTranslatedKeys;
};
