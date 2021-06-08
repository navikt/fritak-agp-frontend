export interface GravidKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Array<Arbeidsgiverperiode>;
  bekreftet: boolean;
  dokumentasjon?: string;
  kontrollDager?: number;
}

export interface Arbeidsgiverperiode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  beloep: number;
}
