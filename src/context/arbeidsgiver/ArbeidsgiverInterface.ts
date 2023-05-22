import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

type ArbeidsgiverInterface = {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: any;
  firma: string;
  setFirma: any;
  arbeidsgiverId: string;
  setArbeidsgiverId: any;
};

export default ArbeidsgiverInterface;
