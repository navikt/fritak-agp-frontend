import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

type ArbeidsgivereResponse = {
  status: number;
  organisasjoner: Array<Organisasjon>;
};

export default ArbeidsgivereResponse;
