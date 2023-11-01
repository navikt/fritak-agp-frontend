import { Organisasjon } from '@navikt/bedriftsmeny';

type ArbeidsgivereResponse = {
  status: number;
  organisasjoner: Array<Organisasjon>;
};

export default ArbeidsgivereResponse;
