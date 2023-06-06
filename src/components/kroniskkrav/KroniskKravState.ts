import { ValidationState } from '../../state/validation/ValidationState';
import { v4 as uuid } from 'uuid';
import EndringsAarsak from '../gravidkrav/EndringsAarsak';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { DateValidationT } from '@navikt/ds-react';

export const defaultKroniskKravState = (state?: KroniskKravState): KroniskKravState => {
  return Object.assign(
    {
      fnr: '',
      perioder: [
        {
          uniqueKey: uuid(),
          perioder: [
            {
              uniqueKey: uuid()
            }
          ]
        }
      ],
      bekreft: false,
      feilmeldinger: Array<FeiloppsummeringFeil>(),
      formDirty: false,
      showSpinner: false,
      endringskrav: false,
      tilValidering: {},
      fraValidering: {}
    },
    state ?? {}
  );
};

export default interface KroniskKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  orgnr?: string;
  orgnrError?: string;
  perioder: Array<KroniskKravPeriode>;
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
  tilValidering: { [key: string]: DateValidationT | undefined };
  fraValidering: { [key: string]: DateValidationT | undefined };
}

export interface KroniskKravPeriode {
  dager?: number;
  dagerError?: string;
  belop?: number;
  belopError?: string;
  grunnbeloep?: number;
  uniqueKey: string;
  sykemeldingsgrad?: string;
  sykemeldingsgradError?: string;
  gradering?: number;
  perioder: Array<Delperiode>;
}

export interface Delperiode {
  uniqueKey: string;
  fom?: Date;
  fomError?: string;
  tom?: Date;
  tomError?: string;
}
