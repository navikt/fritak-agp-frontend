import LangKey from '../../locale/LangKey';
import { Tiltak } from './Tiltak';

const TiltakCheckboxes = [
  {
    label: LangKey.GRAVID_SIDE_TILTAK_FLEKS,
    value: Tiltak.TILPASSET_ARBEIDSTID,
    id: 'arbeidstid'
  },
  {
    label: LangKey.GRAVID_SIDE_TILTAK_HJEMMEKONTOR,
    value: Tiltak.HJEMMEKONTOR,
    id: 'hjemmekontor'
  },
  {
    label: LangKey.GRAVID_SIDE_TILTAK_OPPGAVER,
    value: Tiltak.TILPASSEDE_ARBEIDSOPPGAVER,
    id: 'oppgaver'
  },
  {
    label: LangKey.GRAVID_SIDE_TILTAK_ANNET,
    value: Tiltak.ANNET,
    id: 'annet'
  }
];

export default TiltakCheckboxes;
