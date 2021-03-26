import { Languages } from './utils';

export enum GravidKeys {
  HEADER = 'HEADER'
}

export const translatedGravidKeys: IncludedGravidKeys = {
  [GravidKeys.HEADER]: {
    nb: `NAV kan dekke sykepenger i arbeidsgiverperioden hvis fraværet skyldes helseplager i svangerskapet. Dette
    gjelder bare hvis tilrettelegging eller omplassering ikke er mulig. Vi bruker opplysninger vi allerede har om
    sykefraværet, i tillegg til svarene du gir nedenfor. Ordningen er beskrevet i `
  }
};

export type IncludedGravidKeys = {
  [P in GravidKeys]: {
    [L in Languages]: string;
  };
};
