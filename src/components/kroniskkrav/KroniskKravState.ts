import { ValidationState } from '../../state/validation/ValidationState';
import type { KravPeriodeData } from '../../state/KravPeriodeData';
import { v4 as uuid } from 'uuid';
import { EndringsAarsak } from '../gravidkrav/EndringsAarsak';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';

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

export interface KroniskKravPeriode extends KravPeriodeData {
  gradering?: number;
}
