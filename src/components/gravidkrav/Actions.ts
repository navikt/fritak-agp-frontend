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
  antallDager,
  AddPeriode,
  DeletePeriode,
  Sykemeldingsgrad
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
  response?: ValidationResponse;
  grunnbeloep?: number;
  antallDager?: number;
  itemId?: string;
  sykemeldingsgrad?: string;
}

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
