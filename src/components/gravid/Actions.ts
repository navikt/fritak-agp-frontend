import ValidationResponse from '../../api/ValidationResponse';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import { OmplasseringAarsak } from './OmplasseringAarsak';

export enum Actions {
  Reset,
  Fnr,
  Orgnr,
  Tilrettelegge,
  ToggleTiltak,
  TiltakBeskrivelse,
  Omplassering,
  OmplasseringAarsak,
  Videre,
  Dokumentasjon,
  Bekreft,
  Validate,
  Progress,
  HandleResponse,
  Kvittering
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  tiltak?: Tiltak;
  tiltakBeskrivelse?: string;
  omplassering?: Omplassering;
  omplasseringAarsak?: OmplasseringAarsak;
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
