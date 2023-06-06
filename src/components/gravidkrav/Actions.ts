import ValidationResponse from '../../state/validation/ValidationResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import { GravidKrav } from '../../context/krav';
import IEndringsAarsak from './EndringsAarsak';
import { DateValidationT } from '@navikt/ds-react';

export enum Actions {
  Reset,
  Fnr,
  Orgnr,
  Fra,
  FraValidering,
  Til,
  TilValidering,
  Dager,
  Beloep,
  Bekreft,
  Validate,
  Progress,
  HandleResponse,
  Kvittering,
  NotAuthorized,
  Grunnbeloep,
  antallDager,
  AddPeriode,
  Sykemeldingsgrad,
  DeletePeriode,
  KravEndring,
  AddBackendError,
  RemoveBackendError,
  EndringsAarsak,
  ShowSpinner,
  HideSpinner,
  HideServerError,
  AddDelperiode,
  SlettDelperiode
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  fra?: Date;
  til?: Date;
  validering?: DateValidationT;
  dager?: number;
  belop?: number;
  videre?: boolean;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  response?: ValidationResponse<GravidKravResponse>;
  grunnbeloep?: number;
  antallDager?: number;
  itemId?: string;
  sykemeldingsgrad?: string;
  krav?: GravidKrav;
  error?: string;
  endringsAarsak?: IEndringsAarsak;
}

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
