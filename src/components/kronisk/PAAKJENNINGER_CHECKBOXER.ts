import { PaakjenningerType } from './PaakjenningerType';

export const PAAKJENNINGER_CHECKBOXER = [
  {
    label: 'Allergener eller giftstofferd',
    value: PaakjenningerType.Allergener,
    id: 'allergener'
  },
  {
    label: 'Ukomfortabel temperatur eller luftfuktighet',
    value: PaakjenningerType.Ukomfortabel,
    id: 'ukomfortabel'
  },
  {
    label: 'Stressende omgivelser',
    value: PaakjenningerType.Stressende,
    id: 'stressende'
  },
  {
    label: 'Regelmessige kveldsskift eller nattskift',
    value: PaakjenningerType.RegelmessigKveldsskift,
    id: 'regelmessige'
  },
  { label: 'Mye gåing/ståing', value: PaakjenningerType.Gåing, id: 'gåing' },
  { label: 'Harde gulv', value: PaakjenningerType.HardeGulv, id: 'harde' },
  { label: 'Tunge løft', value: PaakjenningerType.TungeLøft, id: 'tunge' },
  {
    label: 'Annet, gi en kort beskrivelse:',
    value: PaakjenningerType.Annet,
    id: 'annet'
  }
];
