import { ArbeidType } from './ArbeidType';
import { PaakjenningerType } from './PaakjenningerType';

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
  Validate
}

export interface FravaerType {
  year: number;
  month: number;
  dager?: number;
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
}

export interface KroniskAction {
  type: Actions;
  payload?: Payload;
}
