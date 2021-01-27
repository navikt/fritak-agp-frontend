import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../validation/ValidationState';
import { Dato } from '../../utils/Dato';

export const defaultGravidKravState = (state?: GravidKravState): GravidKravState => {
  return Object.assign(
    {
      fnr: '',
      fra: {},
      til: {},
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
  orgnr?: string;
  orgnrError?: string;
  fra: Dato;
  fraError?: string;
  til: Dato;
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
