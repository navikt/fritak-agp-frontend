import BackendOrganisasjon from './BackendOrganisasjon';
import { Organisasjon } from '@navikt/virksomhetsvelger';

export const mapArbeidsgiver = (backendData: BackendOrganisasjon[]): Organisasjon[] =>
  backendData.map(
    (backendOrganisasjon) =>
      ({
        navn: backendOrganisasjon.navn,
        orgnr: backendOrganisasjon.orgnr,
        underenheter: backendOrganisasjon.underenheter
      }) as Organisasjon
  );

export default mapArbeidsgiver;
