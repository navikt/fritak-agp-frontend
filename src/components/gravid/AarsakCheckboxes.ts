import LangKey from "../../locale/LangKey";
import { Aarsak } from "./Aarsak";

const AarsakCheckboxes = [
  {
    label: LangKey.GRAVID_SIDE_OMPLASSERING_MOTSETTER_SEG,
    value: Aarsak.MOTSETTER,
  },
  {
    label: LangKey.GRAVID_SIDE_OMPLASSERING_FAAR_IKKE_KONTAKT,
    value: Aarsak.FAAR_IKKE_KONTAKT,
  },
  {
    label: LangKey.GRAVID_SIDE_OMPLASSERING_IKKE_ANDRE_OPPGAVER,
    value: Aarsak.IKKE_ANDRE_OPPGAVER,
  },
  {
    label: LangKey.GRAVID_SIDE_OMPLASSERING_HELSETILSTANDEN,
    value: Aarsak.HELSETILSTANDEN,
  },
];

export default AarsakCheckboxes;
