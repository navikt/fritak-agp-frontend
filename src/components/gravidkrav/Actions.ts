import ValidationResponse from '../../api/ValidationResponse';

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
  CloseLoggedoutModal
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
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

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
