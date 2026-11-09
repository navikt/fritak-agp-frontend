import type { Dato } from '../utils/dato/Dato';

export interface KravPeriodeData {
  uniqueKey: string;
  fom?: Dato;
  fomError?: string;
  tom?: Dato;
  tomError?: string;
  dager?: number;
  dagerError?: string;
  belop?: number;
  belopError?: string;
  grunnbeloep?: number;
  sykemeldingsgrad?: string;
  sykemeldingsgradError?: string;
}
