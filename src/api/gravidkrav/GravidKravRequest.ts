export interface GravidKravRequest {
  virksomhetsnummer: string;
  identitetsnummer: string;
  periode: Arbeidsgiverperiode;
  bekreftet: boolean;
  dokumentasjon?: String;
}

export interface Arbeidsgiverperiode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  beloep: number;
}
