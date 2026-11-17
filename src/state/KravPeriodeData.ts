import type { DateInputError } from '../utils/dato/Dato';

export interface KravPeriodeData {
  uniqueKey: string;
  fom?: Date;
  fomInputError?: DateInputError;
  fomError?: string;
  tom?: Date;
  tomInputError?: DateInputError;
  tomError?: string;
  dager?: number;
  dagerError?: string;
  beloep?: number;
  beloepError?: string;
  grunnbeloep?: number;
  sykemeldingsgrad?: string;
  sykemeldingsgradError?: string;
}
