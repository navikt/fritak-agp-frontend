export interface GravidKravRequest {
  identitetsnummer: string;
  periode: Arbeidsgiverperiode;
  bekreftet: boolean;
  dokumentasjon?: string;
}

export interface Arbeidsgiverperiode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  beloep: number;
}
