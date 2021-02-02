import { PaakjenningerType } from './PaakjenningerType';
import KroniskState from './KroniskState';
import { validateKronisk } from './validateKronisk';

export const validerPaakjenninger = (paakjenning: PaakjenningerType, state: KroniskState, nextState: KroniskState) => {
  if (!nextState.paakjenninger) {
    nextState.paakjenninger = [];
  }
  if (state.paakjenninger?.includes(paakjenning)) {
    nextState.paakjenninger.splice(state.paakjenninger?.indexOf(paakjenning), 1);
  } else {
    nextState.paakjenninger.push(paakjenning);
  }
  return validateKronisk(nextState);
};
