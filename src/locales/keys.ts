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
    nb: 'Tittel NB',
    nn: 'Tittel NN',
    en: 'Tittel EN'
  }
};

// const translatedStatus: IncludedStatus = {
//   [Status.INNVILGET]: {
//     nb: 'Innvilget',
//     nn: 'Innvilga',
//     en: 'Approved'
//   },
// };

// const translatedErrors: IncludedErrors = {
//   [ErrorType.TOOLOWAMOUNT]: {
//     nb: 'Beløpet er for lavt.',
//     nn: 'Beløpet er for lågt',
//     en: 'Amount is too low.'
//   },
// }

type IncludedKeys = {
  [P in Keys]: {
    [P in Languages]: string;
  };
};

// type IncludedStatus = {
//   [P in Keys]: {
//     [P in Languages]: string;
//   };
// };
//
// type IncludedErrors = {
//   [P in ErrorType]: {
//     [P in Languages]: string;
//   };
// };

const allTranslations: IncludedKeys /*& IncludedStatus& IncludedErrors*/ = {
  ...translatedKeys
  // ...translatedStatus,
  // ...translatedErrors
};

export enum Languages {
  nb = 'nb',
  nn = 'nn',
  en = 'en'
}

export const translationsToJson = (lan: Languages): {} => {
  let translatedKeys = {};
  Object.keys(allTranslations).map((e) => (translatedKeys[e] = allTranslations[e][lan]));
  return translatedKeys;
};
