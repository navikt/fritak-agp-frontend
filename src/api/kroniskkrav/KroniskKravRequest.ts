export interface KroniskKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  periode: [Arbeidsgiverperiode];
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

export default KroniskKravRequest;
