import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export interface ArbeidsgivereResponse {
  status: number;
  organisasjoner: Array<Organisasjon>;
}
