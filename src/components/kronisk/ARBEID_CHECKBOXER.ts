import { ArbeidType } from './ArbeidType';

export const ARBEID_CHECKBOXER = [
  {
    label: 'Stillesittende arbeid',
    value: ArbeidType.Stillesittende,
    id: 'stillesittende'
  },
  { label: 'Moderat fysisk arbeid', value: ArbeidType.Moderat, id: 'moderat' },
  { label: 'Fysisk krevende arbeid', value: ArbeidType.Krevende, id: 'fysisk' }
];
