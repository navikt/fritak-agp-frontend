import { ValidationState } from '../../state/validation/ValidationState';
import { v4 as uuid } from 'uuid';
import EndringsAarsak from './EndringsAarsak';
import { FeiloppsummeringFeil } from '../../validation/mapKravFeilmeldinger';
import { Delperiode } from '../kroniskkrav/KroniskKravState';
import { DateValidationT } from '@navikt/ds-react';

export const defaultGravidKravState = (state?: GravidKravState): GravidKravState => {
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

export interface GravidKravPeriode {
  uniqueKey: string;
  perioder: Array<Delperiode>;
  perioderError?: string;
  dager?: number;
  dagerError?: string;
  belop?: number;
  belopError?: string;
  grunnbeloep?: number;
  sykemeldingsgrad?: string;
  sykemeldingsgradError?: string;
}

export default interface GravidKravState extends ValidationState {
  fnr?: string;
  fnrError?: string;
  orgnrError?: string;
  orgnr?: string;
  perioder: Array<GravidKravPeriode>;
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
