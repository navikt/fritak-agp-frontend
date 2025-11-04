import { ValidationResponse } from '../../state/validation/ValidationResponse';
import KroniskKravResponse from '../../api/gravidkrav/KroniskKravResponse';
import { KroniskKrav } from '../../context/krav';
import { EndringsAarsak as IEndringsAarsak } from '../gravidkrav/EndringsAarsak';
import { Actions } from '../../context/kravPeriodeActions';

// export enum Actions {
//   Reset,
//   Fnr,
//   Orgnr,
//   Fra,
//   Til,
//   Dager,
//   Beloep,
//   Bekreft,
//   Validate,
//   Progress,
//   HandleResponse,
//   Kvittering,
//   NotAuthorized,
//   Grunnbeloep,
//   antallDager,
//   AddPeriod,
//   DeletePeriode,
//   Sykemeldingsgrad,
//   KravEndring,
//   AddBackendError,
//   RemoveBackendError,
//   EndringsAarsak,
//   ShowSpinner,
//   HideSpinner,
//   HideServerError,
//   HideDuplicateSubmissionError,
//   SetFormClean
// }

interface Payload {
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
  response?: ValidationResponse<KroniskKravResponse>;
  grunnbeloep?: number;
  antallDager?: number;
  periode?: number;
  itemId?: string;
  sykemeldingsgrad?: string;
  krav?: KroniskKrav;
  error?: string;
  aarsakEndring?: IEndringsAarsak;
}

export interface KroniskKravAction {
  type: Actions;
  payload?: Payload;
}
