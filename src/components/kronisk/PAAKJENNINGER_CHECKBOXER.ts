import { PaakjenningerType } from './PaakjenningerType';

export const PAAKJENNINGER_CHECKBOXER = [
  {
    label: 'KRONISK_SIDE_PAAKJENNINGER_1',
    value: PaakjenningerType.ALLERGENER,
    id: 'allergener'
  },
  {
    label: 'KRONISK_SIDE_PAAKJENNINGER_2',
    value: PaakjenningerType.UKOMFORTABEL,
    id: 'ukomfortabel'
  },
  {
    label: 'KRONISK_SIDE_PAAKJENNINGER_3',
    value: PaakjenningerType.STRESSENDE,
    id: 'stressende'
  },
  {
    label: 'KRONISK_SIDE_PAAKJENNINGER_4',
    value: PaakjenningerType.REGELMESSIG,
    id: 'regelmessige'
  },
  { label: 'KRONISK_SIDE_PAAKJENNINGER_5', value: PaakjenningerType.GAAING, id: 'gåing' },
  { label: 'KRONISK_SIDE_PAAKJENNINGER_6', value: PaakjenningerType.HARDE, id: 'harde' },
  { label: 'KRONISK_SIDE_PAAKJENNINGER_7', value: PaakjenningerType.TUNGE, id: 'tunge' },
  {
    label: 'KRONISK_SIDE_PAAKJENNINGER_8',
    value: PaakjenningerType.ANNET,
    id: 'annet'
  }
];
