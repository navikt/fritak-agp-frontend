import { PaakjenningerType } from './PaakjenningerType';

export const PAAKJENNINGER_CHECKBOXER = [
  {
    label: 'Allergener eller giftstofferd',
    value: PaakjenningerType.ALLERGENER,
    id: 'allergener'
  },
  {
    label: 'Ukomfortabel temperatur eller luftfuktighet',
    value: PaakjenningerType.UKOMFORTABEL,
    id: 'ukomfortabel'
  },
  {
    label: 'Stressende omgivelser',
    value: PaakjenningerType.STRESSENDE,
    id: 'stressende'
  },
  {
    label: 'Regelmessige kveldsskift eller nattskift',
    value: PaakjenningerType.REGELMESSIG,
    id: 'regelmessige'
  },
  { label: 'Mye gåing/ståing', value: PaakjenningerType.GAAING, id: 'gåing' },
  { label: 'Harde gulv', value: PaakjenningerType.HARDE, id: 'harde' },
  { label: 'Tunge løft', value: PaakjenningerType.TUNGE, id: 'tunge' },
  {
    label: 'Annet, gi en kort beskrivelse:',
    value: PaakjenningerType.ANNET,
    id: 'annet'
  }
];
