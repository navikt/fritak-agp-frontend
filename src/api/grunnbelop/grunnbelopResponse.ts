export interface grunnbelopResponse {
  status: number;
  grunnbelop?: Grunnbelop;
}

export interface Grunnbelop {
  dato: string;
  grunnbeloep: number;
  grunnbeloepPerMaaned: number;
  gjennomsnittPerAar: number;
  omregningsfaktor: number;
}
