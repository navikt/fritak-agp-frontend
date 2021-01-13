import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ArbeidType } from './ArbeidType';
import { PaakjenningerType } from './PaakjenningerType';
import { Aarsfravaer } from './Aarsfravaer';

export const defaultKroniskState = (): KroniskState => {
  return {
    fnr: '',
    orgnr: '',
    fravaer: [],
    arbeid: [],
    paakjenninger: [],
    kommentar: '',
    dokumentasjon: '',
    bekreft: false,
    feilmeldinger: Array<FeiloppsummeringFeil>()
  };
};

export default interface KroniskState {
  fnr?: string;
  fnrError?: string;
  orgnr?: string;
  orgnrError?: string;
  arbeid?: Array<ArbeidType>;
  arbeidError?: string;
  paakjenninger?: Array<PaakjenningerType>;
  paakjenningerError?: string;
  kommentar?: string;
  kommentarError?: string;
  dokumentasjon?: string;
  dokumentasjonError?: string;
  fravaer?: Array<Aarsfravaer>;
  fravaerError?: string;
  feilmeldinger?: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
  error?: boolean;
  login?: boolean;
  submitting?: boolean;
}
