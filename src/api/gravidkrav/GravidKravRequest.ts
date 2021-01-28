export interface GravidKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
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
