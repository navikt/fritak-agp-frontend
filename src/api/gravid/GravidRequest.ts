import { Dato } from '../../utils/Dato';

export interface GravidRequest {
  virksomhetsnummer: string;
  identitetsnummer: string;
  tilrettelegge: boolean;
  bekreftet: boolean;
  tiltak?: string[];
  tiltakBeskrivelse?: string;
  omplassering?: string;
  omplasseringAarsak?: string;
  dokumentasjon?: string;
  termindato?: string;
}
