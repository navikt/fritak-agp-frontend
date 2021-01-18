import ValidationResponse from '../../api/ValidationResponse';
import { Tiltak } from './Tiltak';
import { OmplasseringForsoek } from './OmplasseringForsoek';
import { OmplasseringAarsak } from './OmplasseringAarsak';

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
  Kvittering
}

export interface Payload {
  fnr?: string;
  orgnr?: string;
  tilrettelegge?: boolean;
  tiltak?: Tiltak;
  tiltakBeskrivelse?: string;
  omplasseringForsoek?: OmplasseringForsoek;
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
