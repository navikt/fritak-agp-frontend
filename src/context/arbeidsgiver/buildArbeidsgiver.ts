import { Organisasjon } from '@navikt/virksomhetsvelger';

const buildArbeidsgiver = (navn: string, orgnr: string, underenheter: Organisasjon[]): Organisasjon => {
  return {
    navn,
    orgnr,
    underenheter
  };
};

export default buildArbeidsgiver;
