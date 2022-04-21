import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import { KroniskKrav } from '../oversiktkrav/tilpassOversiktKrav';
import IEndringsAarsak from '../gravidkrav/EndringsAarsak';

export enum Actions {
  Reset,
  Fnr,
  Orgnr,
  Fra,
  Til,
  Dager,
  Beloep,
  Dokumentasjon,
  Bekreft,
  Validate,
  Progress,
  HandleResponse,
  Kvittering,
  NotAuthorized,
  Grunnbeloep,
  antallDager,
  AddPeriod,
  DeletePeriod,
  Sykemeldingsgrad,
  KravEndring,
  AddBackendError,
  RemoveBackendError,
  EndringsAarsak,
  AarsakMangler,
  ShowSpinner,
  HideSpinner,
  HideServerError
}

export interface Payload {
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
