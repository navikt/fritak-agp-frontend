import { FravaerType } from './Actions';
import KroniskState from './KroniskState';
import { monthKey } from '../../utils/monthKey';
import { MONTHS } from '../../utils/months';
import { Aarsfravaer } from './Aarsfravaer';
import { isAarsFravaerEmpty } from './isAarsFravaerEmpty';
import { stringishToNumber } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const validerFravaer = (fravaer: FravaerType, nextState: KroniskState) => {
  if (!nextState.fravaer) {
    nextState.fravaer = [];
  }
  const { year, month, dager } = fravaer;
  if (month < 0 || month > 11) {
    throw new Error('Month må være mellom 0 og 11');
  }

  const antallDager = stringishToNumber(dager);
  const monthProp = monthKey(MONTHS[month]);
  const aarfravaer = nextState.fravaer?.find((f) => f.year === year);
  if (aarfravaer === undefined) {
    const a = { year: year } as Aarsfravaer;
    a[monthProp] = antallDager;
    nextState.fravaer?.push(a);
  } else {
    aarfravaer[monthProp] = antallDager;
  }
  nextState.fravaer = nextState.fravaer.filter((f) => !isAarsFravaerEmpty(f));
  return nextState;
};
