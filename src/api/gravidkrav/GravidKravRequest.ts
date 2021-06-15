export interface GravidKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Array<Arbeidsgiverperiode>;
  bekreftet: boolean;
  dokumentasjon?: string;
  antallDager?: number;
}

export interface Arbeidsgiverperiode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  månedsinntekt: number;
}
