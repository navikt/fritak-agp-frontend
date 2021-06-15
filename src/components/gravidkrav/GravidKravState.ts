import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../state/validation/ValidationState';
import { Dato } from '../../utils/dato/Dato';
import { v4 as uuid } from 'uuid';

export const defaultGravidKravState = (state?: GravidKravState): GravidKravState => {
  return Object.assign(
    {
      fnr: '',
      perioder: [{ uniqueKey: uuid() }],
      dokumentasjon: '',
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>()
    },
    state || {}
  );
};

export interface Periode {
  uniqueKey: string;
  fom?: Dato;
  fomError?: string;
  tom?: Dato;
  tomError?: string;
  dager?: number;
  dagerError?: string;
  beloep?: number;
  beloepError?: string;
}

export default interface GravidKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  orgnrError?: string;
  orgnr?: string;
  perioder?: Array<Periode>;
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
  notAuthorized?: boolean;
  submitting?: boolean;
  gDagsbeloep?: number;
  kontrollDager?: number;
}
