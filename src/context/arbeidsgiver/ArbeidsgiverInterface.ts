import { Organisasjon } from '@navikt/virksomhetsvelger';

type ArbeidsgiverInterface = {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: any;
  firma: string;
  setFirma: any;
  arbeidsgiverId: string;
  setArbeidsgiverId: any;
};

export default ArbeidsgiverInterface;
