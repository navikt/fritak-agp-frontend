import { ArbeidType } from './ArbeidType';
import KroniskState from './KroniskState';

export const validerArbeid = (arbeid: ArbeidType, state: KroniskState, nextState: KroniskState) => {
  if (!nextState.arbeid) {
    nextState.arbeid = [];
  }
  if (state.arbeid?.includes(arbeid)) {
    nextState.arbeid.splice(state.arbeid?.indexOf(arbeid), 1);
  } else {
    nextState.arbeid.push(arbeid);
  }
  return nextState;
};
