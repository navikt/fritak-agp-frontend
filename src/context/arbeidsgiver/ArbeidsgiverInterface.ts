import { Organisasjon } from '@navikt/virksomhetsvelger';
import type { Dispatch, SetStateAction } from 'react';

type ArbeidsgiverInterface = {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: Dispatch<SetStateAction<Organisasjon[]>>;
  firma: string;
  setFirma: Dispatch<SetStateAction<string>>;
  arbeidsgiverId: string;
  setArbeidsgiverId: Dispatch<SetStateAction<string>>;
};

export default ArbeidsgiverInterface;
