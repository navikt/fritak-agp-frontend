import LangKey from '../../locale/LangKey';
import { Omplassering } from './Omplassering';
import { GravidSideKeys } from './GravidSideKeys';

const OmplasseringCheckboxes = [
  {
    label: LangKey.JA,
    value: Omplassering.JA
  },
  {
    label: LangKey.NEI,
    value: Omplassering.NEI
  },
  {
    label: GravidSideKeys.GRAVID_SIDE_OMPLASSERING_IKKE_MULIG,
    value: Omplassering.IKKE_MULIG
  }
];

export default OmplasseringCheckboxes;
