import { Organisasjon } from '@navikt/virksomhetsvelger';

type ArbeidsgivereResponse = {
  status: number;
  organisasjoner: Array<Organisasjon>;
};

export default ArbeidsgivereResponse;
