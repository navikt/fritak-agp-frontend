import { Languages } from './utils';

export enum CommonKeys {
  SUB_TITLE_GRAVID = 'SUB_TITLE_GRAVID',
  FOLKETRYGDLOVEN = 'FOLKETRYGDLOVEN'
}

export const translatedCommonKeys: IncludedCommonKeys = {
  [CommonKeys.SUB_TITLE_GRAVID]: {
    nb: 'Gravid ansatt'
  },

  [CommonKeys.FOLKETRYGDLOVEN]: {
    nb: 'folketrygdlovens § 8-20'
  }
};

export type IncludedCommonKeys = {
  [P in CommonKeys]: {
    [L in Languages]: string;
  };
};
