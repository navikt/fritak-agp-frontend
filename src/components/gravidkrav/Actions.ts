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
  CloseKontrollsporsmaalLonn,
  OpenKontrollsporsmaalLonn,
  Grunnbeloep,
  KontrollDager,
  AddPeriode,
  DeletePeriode
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
  itemId?: string;
}

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
