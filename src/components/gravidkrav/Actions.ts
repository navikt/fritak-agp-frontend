import { ValidationResponse } from '../../state/validation/ValidationResponse';
import GravidKravResponse from '../../api/gravidkrav/GravidKravResponse';
import { GravidKrav } from '../../context/krav';
import { EndringsAarsak as IEndringsAarsak } from './EndringsAarsak';
import { Actions } from '../../context/kravPeriodeActions';

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
  response?: ValidationResponse<GravidKravResponse>;
  grunnbeloep?: number;
  antallDager?: number;
  itemId?: string;
  sykmeldingsgrad?: string;
  krav?: GravidKrav;
  error?: string;
  aarsakEndring?: IEndringsAarsak;
}

export interface GravidKravAction {
  type: Actions;
  payload?: Payload;
}
