export interface KroniskKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: [Arbeidsgiverperiode];
  bekreftet: boolean;
  dokumentasjon?: string;
  antallDager?: number;
}

export interface Arbeidsgiverperiode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  månedsinntekt: number;
  gradering: number;
}

export default KroniskKravRequest;
