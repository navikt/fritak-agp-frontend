import ValidationResponse from '../../state/validation/ValidationResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import { GravidKrav } from '../../context/krav';
import IEndringsAarsak from './EndringsAarsak';

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
  AddPeriode,
  DeletePeriode,
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
