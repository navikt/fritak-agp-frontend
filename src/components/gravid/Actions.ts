import ValidationResponse from '../../api/ValidationResponse';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import { Aarsak } from './Aarsak';

export enum Actions {
  Reset,
  Fnr,
  Orgnr,
  Tilrettelegge,
  ToggleTiltak,
  TiltakBeskrivelse,
  OmplasseringForsoek,
  OmplasseringAarsak,
  Videre,
  Dokumentasjon,
  Bekreft,
  Validate,
  Progress,
  HandleResponse,
  Kvittering,
  CloseServerFeilModal
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  tiltak?: Tiltak;
  tiltakBeskrivelse?: string;
  omplasseringForsoek?: Omplassering;
  omplasseringAarsak?: Aarsak;
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
