import ValidationResponse from '../../state/validation/ValidationResponse';

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
  KontrollDager,
  AddPeriod,
  DeletePeriod
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  fom?: Date;
  tom?: Date;
  dager?: number;
  beloep?: number;
  videre?: boolean;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  dokumentasjon?: string;
  response?: ValidationResponse;
  grunnbeloep?: number;
  kontrollDager?: number;
  periode?: number;
  itemId?: string;
}

export interface KroniskKravAction {
  type: Actions;
  payload?: Payload;
}
