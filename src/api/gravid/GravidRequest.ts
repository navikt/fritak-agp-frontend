export interface GravidRequest {
  orgnr: string;
  fnr: string;
  tilrettelegge: boolean;
  bekreftet: boolean;
  tiltak?: string[];
  tiltakBeskrivelse?: string;
  omplassering?: string;
  omplasseringAarsak?: string;
  dokumentasjon?: string;
}
