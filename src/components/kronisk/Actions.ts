import { ArbeidType } from './ArbeidType';
import { PaakjenningerType } from './PaakjenningerType';
import ValidationResponse from '../../state/validation/ValidationResponse';

export enum Actions {
  Reset,
  Progress,
  Kvittering,
  Fnr,
  Orgnr,
  ToggleArbeid,
  TogglePaakjenninger,
  Kommentar,
  Dokumentasjon,
  Fravaer,
  Bekreft,
  Validate,
  HandleResponse,
  NotAuthorized,
  AntallPerioder
}

export interface FravaerType {
  year: number;
  month: number;
  dager: string;
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  arbeid?: ArbeidType;
  paakjenning?: PaakjenningerType;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  fravaer?: FravaerType;
  dokumentasjon?: string;
  kommentar?: string;
  response?: ValidationResponse;
  antallPerioder?: number;
}

export interface KroniskAction {
  type: Actions;
  payload?: Payload;
}
