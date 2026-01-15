import { Organisasjon } from '@navikt/virksomhetsvelger';

type ArbeidsgiverInterface = {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: (arbeidsgivere: Array<Organisasjon>) => void;
  firma: string;
  setFirma: (firma: string) => void;
  arbeidsgiverId: string;
  setArbeidsgiverId: (arbeidsgiverId: string) => void;
};

export default ArbeidsgiverInterface;
