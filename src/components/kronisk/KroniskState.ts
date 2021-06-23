import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ArbeidType } from './ArbeidType';
import { PaakjenningerType } from './PaakjenningerType';
import { Aarsfravaer } from './Aarsfravaer';
import { ValidationState } from '../../state/validation/ValidationState';

export const defaultKroniskState = (): KroniskState => {
  return {
    fnr: undefined,
    orgnr: undefined,
    fravaer: undefined,
    arbeid: undefined,
    paakjenninger: undefined,
    kommentar: undefined,
    dokumentasjon: undefined,
    bekreft: undefined,
    feilmeldinger: Array<FeiloppsummeringFeil>()
  };
};

export default interface KroniskState extends ValidationState {
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
  feilmeldinger: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
  error?: boolean;
  notAuthorized?: boolean;
  submitting?: boolean;
  antallPerioder?: number;
  antallPerioderError?: string;
}
