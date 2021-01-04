import { ArbeidType } from './ArbeidType';
import { PåkjenningerType } from './PåkjenningerType';

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
  Fravær,
  Bekreft,
  Validate
}

export interface FraværType {
  year: number;
  month: string;
  dager?: number;
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  arbeid?: ArbeidType;
  påkjenning?: PåkjenningerType;
  bekreft?: boolean;
  progress?: boolean;
  kvittering?: boolean;
  fravær?: FraværType;
  dokumentasjon?: string;
  kommentar?: string;
}

export interface KroniskAction {
  type: Actions;
  payload?: Payload;
}
