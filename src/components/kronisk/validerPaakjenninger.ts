import { PaakjenningerType } from './PaakjenningerType';
import KroniskState from './KroniskState';
import { validateKronisk } from './validateKronisk';
import { i18n } from 'i18next';

export const validerPaakjenninger = (
  paakjenning: PaakjenningerType,
  state: KroniskState,
  nextState: KroniskState,
  translate: i18n
) => {
  if (!nextState.paakjenninger) {
    nextState.paakjenninger = [];
  }
  if (state.paakjenninger?.includes(paakjenning)) {
    nextState.paakjenninger.splice(state.paakjenninger?.indexOf(paakjenning), 1);
  } else {
    nextState.paakjenninger.push(paakjenning);
  }
  return validateKronisk(nextState, translate);
};
