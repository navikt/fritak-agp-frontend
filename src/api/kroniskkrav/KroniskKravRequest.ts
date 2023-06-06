export interface KroniskKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Array<Arbeidsgiverperiode>;
  bekreftet: boolean;
  dokumentasjon?: string;
  antallDager?: number;
}

export interface Arbeidsgiverperiode {
  antallDagerMedRefusjon: number;
  månedsinntekt: number;
  gradering: number;
  perioder: Array<Periode>;
}

interface Periode {
  fom: string;
  tom: string;
}

export default KroniskKravRequest;
