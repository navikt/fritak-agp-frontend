import { Tiltak } from './Tiltak';

const CHECKBOX_TILTAK = [
  {
    label: 'Fleksibel eller tilpasset arbeidstid',
    value: Tiltak.TILPASSET_ARBEIDSTID,
    id: 'arbeidstid'
  },
  {
    label: 'Hjemmekontor',
    value: Tiltak.HJEMMEKONTOR,
    id: 'hjemmekontor'
  },
  {
    label: 'Tilpassede arbeidsoppgaver',
    value: Tiltak.TILPASSEDE_ARBEIDSOPPGAVER,
    id: 'oppgaver'
  },
  {
    label: 'Annet, gi en kort beskrivelse av hva dere har gjort:',
    value: Tiltak.ANNET,
    id: 'annet'
  }
];

export default CHECKBOX_TILTAK;
