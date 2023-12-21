import ValidationResponse from '../../state/validation/ValidationResponse';
import KroniskSoknadResponse from '../../api/kronisk/KroniskSoknadResponse';

export enum Actions {
  Reset,
  Progress,
  Kvittering,
  Fnr,
  Orgnr,
  Dokumentasjon,
  Fravaer,
  Bekreft,
  Validate,
  HandleResponse,
  NotAuthorized,
  AntallPerioder,
  HideServerError,
  ToggleUnntak,
  HideDuplicateSubmissionError
}

export interface FravaerType {
  year: number;
  month: number;
  dager: string;
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  fravaer?: FravaerType;
  dokumentasjon?: string;
  response?: ValidationResponse<KroniskSoknadResponse>;
  antallPerioder?: number;
}

export interface KroniskAction {
  type: Actions;
  payload?: Payload;
}
