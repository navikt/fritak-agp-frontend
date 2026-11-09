import { ValidationResponse } from '../../state/validation/ValidationResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import { KroniskKrav } from '../../context/krav';
import { EndringsAarsak as IEndringsAarsak } from '../gravidkrav/EndringsAarsak';
import type KroniskKravState from './KroniskKravState';

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
  AntallDager,
  AddPeriode,
  DeletePeriode,
  Sykemeldingsgrad,
  KravEndring,
  AddBackendError,
  RemoveBackendError,
  EndringsAarsak,
  ShowSpinner,
  HideSpinner,
  HideServerError,
  HideDuplicateSubmissionError,
  SetFormClean,
  SubmitValidation
}

interface Payload {
  validationResult?: KroniskKravState;
  fnr?: string;
  orgnr?: string;
  fra?: Date;
  til?: Date;
  dager?: number;
  beloep?: number;
  videre?: boolean;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  dokumentasjon?: string;
  response?: ValidationResponse<KroniskKravResponse>;
  grunnbeloep?: number;
  antallDager?: number;
  periode?: number;
  itemId?: string;
  sykemeldingsgrad?: string;
  krav?: KroniskKrav;
  error?: string;
  endringsAarsak?: IEndringsAarsak;
}

export interface KroniskKravAction {
  type: Actions;
  payload?: Payload;
}
