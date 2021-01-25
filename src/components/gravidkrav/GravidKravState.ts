import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../validation/ValidationState';

export const defaultGravidKravState = (state?: GravidKravState): GravidKravState => {
  return Object.assign(
    {
      fnr: '',
      dokumentasjon: '',
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>()
    },
    state || {}
  );
};

export default interface GravidKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  fra?: string;
  fraError?: string;
  til?: string;
  tilError?: string;
  dager?: number;
  dagerError?: string;
  beloep?: string;
  beloepError?: string;
  dokumentasjon?: string;
  dokumentasjonError?: string;
  feilmeldinger: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
  error?: boolean;
  login?: boolean;
  submitting?: boolean;
}
