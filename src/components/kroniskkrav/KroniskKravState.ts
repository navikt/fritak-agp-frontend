import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../validation/ValidationState';
import { Dato } from '../../utils/Dato';

export const defaultKroniskKravState = (state?: KroniskKravState): KroniskKravState => {
  return Object.assign(
    {
      fnr: '',
      periode: [
        {
          fra: {},
          til: {}
        }
      ],
      bekreft: false,
      isOpenKontrollsporsmaalLonn: false,
      feilmeldinger: Array<FeiloppsummeringFeil>()
    },
    state || {}
  );
};

export default interface KroniskKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  orgnr?: string;
  orgnrError?: string;
  periode?: Array<KroniskKravPeriode>;
  periodeError?: string;
  feilmeldinger: Array<FeiloppsummeringFeil>;
  validated?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  bekreft?: boolean;
  bekreftError?: string;
  error?: boolean;
  login?: boolean;
  notAuthorized?: boolean;
  submitting?: boolean;
  isOpenKontrollsporsmaalLonn?: boolean;
  gDagsbeloep?: number;
  kontrollDager?: number;
}

export interface KroniskKravPeriode {
  fra?: Dato;
  fraError?: string;
  til?: Dato;
  tilError?: string;
  dager?: number;
  dagerError?: string;
  beloep?: number;
  beloepError?: string;
}
