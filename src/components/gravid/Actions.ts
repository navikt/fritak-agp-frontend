import ValidationResponse from '../../state/validation/ValidationResponse';
import { Tiltak } from './Tiltak';
import { Omplassering } from './Omplassering';
import { Aarsak } from './Aarsak';
import { GravidSoknadResponse } from '../../api/gravid/GravidSoknadResponse';
import { DateValidationT } from '@navikt/ds-react';

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
  NotAuthorized,
  HideServerError,
  Termindato,
  TermindatoValidering
}

export type Payload = {
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
  response?: ValidationResponse<GravidSoknadResponse>;
  termindato?: Date;
  termindatoValidering?: DateValidationT;
};

export type GravidAction = {
  type: Actions;
  payload?: Payload;
};
