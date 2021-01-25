import ValidationResponse from '../../api/ValidationResponse';

export enum Actions {
  Reset,
  Fnr,
  Fra,
  Til,
  Dager,
  Beloep,
  Dokumentasjon,
  Bekreft,
  Validate,
  Progress,
  HandleResponse,
  Kvittering
}

export interface Payload {
  fnr?: string;
  fra?: string;
  til?: string;
  dager?: number;
  beloep?: string;
  videre?: boolean;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  dokumentasjon?: string;
  response?: ValidationResponse;
}

export interface GravidAction {
  type: Actions;
  payload?: Payload;
}
