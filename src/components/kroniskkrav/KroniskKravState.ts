import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { ValidationState } from '../../state/validation/ValidationState';
import { Dato } from '../../utils/dato/Dato';
import { v4 as uuid } from 'uuid';
import EndringsAarsak from '../gravidkrav/EndringsAarsak';

export const defaultKroniskKravState = (state?: KroniskKravState): KroniskKravState => {
  return Object.assign(
    {
      fnr: '',
      perioder: [
        {
          uniqueKey: uuid()
        }
      ],
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>(),
      formDirty: false,
      showSpinner: false,
      endringskrav: false
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
  antallDager?: number;
  antallDagerError?: string;
  kravId?: string;
  formDirty?: boolean;
  endringsAarsak?: EndringsAarsak;
  endringsAarsakError?: string;
  showSpinner?: boolean;
  endringskrav?: boolean;
}

export interface KroniskKravPeriode {
  fom?: Dato;
  fomError?: string;
  tom?: Dato;
  tomError?: string;
  dager?: number;
  dagerError?: string;
  belop?: number;
  belopError?: string;
  grunnbeloep?: number;
  uniqueKey: string;
  sykemeldingsgrad?: string;
  sykemeldingsgradError?: string;
  gradering?: number;
}
