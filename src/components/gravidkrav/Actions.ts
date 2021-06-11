import { ValidationResponse } from '@navikt/helse-arbeidsgiver-felles-frontend';

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
  KontrollDager
}

export interface Payload {
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
  response?: ValidationResponse;
  grunnbeloep?: number;
  kontrollDager?: number;
}

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
