export interface GrunnbeloepResponse {
  status: number;
  grunnbeloep?: Grunnbeloep;
}

interface Grunnbeloep {
  dato: string;
  grunnbeloep: number;
  grunnbeloepPerMaaned: number;
  gjennomsnittPerAar: number;
  omregningsfaktor: number;
}
