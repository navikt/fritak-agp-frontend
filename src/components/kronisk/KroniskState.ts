import { Aarsfravaer } from './Aarsfravaer';
import { ValidationState } from '../../state/validation/ValidationState';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';

export const defaultKroniskState = (): KroniskState => {
  return {
    fnr: undefined,
    orgnr: undefined,
    fravaer: undefined,
    dokumentasjon: undefined,
    bekreft: undefined,
    feilmeldinger: Array<FeiloppsummeringFeil>(),
    ikkeHistoriskFravaer: false
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
  ikkeHistoriskFravaer?: boolean;
  ikkeHistoriskFravaerError?: string;
}
