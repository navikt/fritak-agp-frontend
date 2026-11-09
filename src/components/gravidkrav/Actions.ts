import { ValidationResponse } from '../../state/validation/ValidationResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import { GravidKrav } from '../../context/krav';
import { EndringsAarsak as IEndringsAarsak } from './EndringsAarsak';
import type GravidKravState from './GravidKravState';

export enum Actions {
  Reset,
  Fnr,
  Orgnr,
  Fra,
  Til,
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
  HideDuplicateSubmissionError,
  SubmitValidation
}

interface Payload {
  validationResult?: GravidKravState;
  fnr?: string;
  orgnr?: string;
  fra?: Date;
  til?: Date;
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
