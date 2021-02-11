import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

interface ArbeidsgiverInterface {
  arbeidsgivere: Array<Organisasjon>;
  setArbeidsgivere: any;
  firma: string;
  setFirma: any;
  arbeidsgiverId: string;
  setArbeidsgiverId: any;
}

export default ArbeidsgiverInterface;
