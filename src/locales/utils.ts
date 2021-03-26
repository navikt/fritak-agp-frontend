import { IncludedGravidKeys, translatedGravidKeys } from './GravidKeys';
import { IncludedCommonKeys, translatedCommonKeys } from './CommonKeys';

const allTranslations: IncludedCommonKeys & IncludedGravidKeys = {
  ...translatedGravidKeys,
  ...translatedCommonKeys
};

export enum Languages {
  nb = 'nb'
}

export const translationsToJson = (lan: Languages): {} => {
  let allTranslatedKeys = {};
  Object.keys(allTranslations).forEach((e) => (allTranslatedKeys[e] = allTranslations[e][lan]));
  return allTranslatedKeys;
};
