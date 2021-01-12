import { ArbeidType } from './ArbeidType';

export const ARBEID_CHECKBOXER = [
  {
    label: 'Stillesittende arbeid',
    value: ArbeidType.STILLESITTENDE,
    id: 'stillesittende'
  },
  { label: 'Moderat fysisk arbeid', value: ArbeidType.MODERAT, id: 'moderat' },
  { label: 'Fysisk krevende arbeid', value: ArbeidType.KREVENDE, id: 'fysisk' }
];
