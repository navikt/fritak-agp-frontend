import { i18n } from 'i18next';
import { ArbeidType } from './ArbeidType';
import KroniskState from './KroniskState';
import { validateKronisk } from './validateKronisk';

export const validerArbeid = (arbeid: ArbeidType, state: KroniskState, nextState: KroniskState, translate: i18n) => {
  if (!nextState.arbeid) {
    nextState.arbeid = [];
  }
  if (state.arbeid?.includes(arbeid)) {
    nextState.arbeid.splice(state.arbeid?.indexOf(arbeid), 1);
  } else {
    nextState.arbeid.push(arbeid);
  }
  return validateKronisk(nextState, translate);
};
