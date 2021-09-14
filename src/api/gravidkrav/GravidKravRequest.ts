import { Arbeidsgiverperiode } from '../kroniskkrav/KroniskKravRequest';

export interface GravidKravRequest {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Array<Arbeidsgiverperiode>;
  bekreftet: boolean;
  dokumentasjon?: string;
  antallDager?: number;
}
