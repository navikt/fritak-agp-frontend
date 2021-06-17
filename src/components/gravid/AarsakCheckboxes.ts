import { Aarsak } from './Aarsak';
import { GravidSideKeys } from './GravidSideKeys';

const AarsakCheckboxes = [
  {
    label: GravidSideKeys.GRAVID_SIDE_OMPLASSERING_MOTSETTER_SEG,
    value: Aarsak.MOTSETTER
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_OMPLASSERING_FAAR_IKKE_KONTAKT,
    value: Aarsak.FAAR_IKKE_KONTAKT
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_OMPLASSERING_IKKE_ANDRE_OPPGAVER,
    value: Aarsak.IKKE_ANDRE_OPPGAVER
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_OMPLASSERING_HELSETILSTANDEN,
    value: Aarsak.HELSETILSTANDEN
  }
];

export default AarsakCheckboxes;
