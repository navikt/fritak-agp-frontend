import { ValidationState } from '../../state/validation/ValidationState';
import { Dato } from '../../utils/dato/Dato';
import { v4 as uuid } from 'uuid';
import { EndringsAarsak } from './EndringsAarsak';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';

export const defaultGravidKravState = (state?: GravidKravState): GravidKravState => {
  return Object.assign(
    {
      fnr: '',
      perioder: [{ uniqueKey: uuid() }],
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>(),
      formDirty: false,
      showSpinner: false,
      endringskrav: false
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
  belop?: number;
  belopError?: string;
  grunnbeloep?: number;
  sykmeldingsgrad?: string;
  sykmeldingsgradError?: string;
}

export default interface GravidKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  orgnrError?: string;
  orgnr?: string;
  perioder?: Array<Periode>;
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
  aarsakEndring?: EndringsAarsak;
  aarsakEndringError?: string;
  showSpinner?: boolean;
  endringskrav?: boolean;
}
