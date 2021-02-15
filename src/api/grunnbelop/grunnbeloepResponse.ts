export interface grunnbeloepResponse {
  status: number;
  grunnbeloep?: Grunnbeloep;
}

export interface Grunnbeloep {
  dato: string;
  grunnbeloep: number;
  grunnbeloepPerMaaned: number;
  gjennomsnittPerAar: number;
  omregningsfaktor: number;
}
