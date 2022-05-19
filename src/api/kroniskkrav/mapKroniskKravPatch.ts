import { KroniskKravRequest } from './KroniskKravRequest';
import { KroniskKravPeriode } from '../../components/kroniskkrav/KroniskKravState';
import EndringsAarsak from '../../components/gravidkrav/EndringsAarsak';
import { mapKroniskKravRequest } from './mapKroniskKravRequest';

export interface KroniskKravPatch extends KroniskKravRequest {
  aarsakEndring: EndringsAarsak;
}

export const mapKroniskKravPatch = (
  fnr: string | undefined,
  orgnr: string | undefined,
  perioder: Array<KroniskKravPeriode> | undefined,
  bekreft: boolean | undefined,
  antallDager: number | undefined,
  aarsakEndring: EndringsAarsak
): KroniskKravPatch => {
  const request = mapKroniskKravRequest(fnr, orgnr, perioder, bekreft, antallDager);

  return {
    identitetsnummer: request.identitetsnummer,
    virksomhetsnummer: request.virksomhetsnummer,
    perioder: request.perioder,
    bekreftet: request.bekreftet,
    antallDager: request.antallDager,
    aarsakEndring: aarsakEndring
  };
};
