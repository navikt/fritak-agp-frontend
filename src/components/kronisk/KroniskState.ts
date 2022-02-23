import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Aarsfravaer } from './Aarsfravaer';
import { ValidationState } from '../../state/validation/ValidationState';

export const defaultKroniskState = (): KroniskState => {
  return {
    fnr: undefined,
    orgnr: undefined,
    fravaer: undefined,
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
