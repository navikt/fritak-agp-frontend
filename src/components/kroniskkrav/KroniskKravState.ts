import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../state/validation/ValidationState';
import { Dato } from '../../utils/dato/Dato';
import { v4 as uuid } from 'uuid';

export const defaultKroniskKravState = (state?: KroniskKravState): KroniskKravState => {
  return Object.assign(
    {
      fnr: '',
      perioder: [
        {
          fra: {},
          til: {},
          uniqueKey: uuid()
        }
      ],
      bekreft: false,
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
  perioder?: Array<KroniskKravPeriode>;
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
  grunnbeloep?: number;
  uniqueKey?: string;
}
