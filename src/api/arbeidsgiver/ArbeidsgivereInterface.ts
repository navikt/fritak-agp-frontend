import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export interface ArbeidsgivereInterface {
  status: number;
  organisasjoner: Array<Organisasjon>;
}
