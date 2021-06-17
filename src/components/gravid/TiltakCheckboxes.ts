import { Tiltak } from './Tiltak';
import { GravidSideKeys } from './GravidSideKeys';

const TiltakCheckboxes = [
  {
    label: GravidSideKeys.GRAVID_SIDE_TILTAK_FLEKS,
    value: Tiltak.TILPASSET_ARBEIDSTID,
    id: 'arbeidstid'
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_TILTAK_HJEMMEKONTOR,
    value: Tiltak.HJEMMEKONTOR,
    id: 'hjemmekontor'
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_TILTAK_OPPGAVER,
    value: Tiltak.TILPASSEDE_ARBEIDSOPPGAVER,
    id: 'oppgaver'
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_TILTAK_ANNET,
    value: Tiltak.ANNET,
    id: 'annet'
  }
];

export default TiltakCheckboxes;
