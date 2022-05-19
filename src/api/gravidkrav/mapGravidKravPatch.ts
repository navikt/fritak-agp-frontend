import { GravidKravRequest } from './GravidKravRequest';
import { Periode } from '../../components/gravidkrav/GravidKravState';
import { mapGravidKravRequest } from './mapGravidKravRequest';
import EndringsAarsak from '../../components/gravidkrav/EndringsAarsak';

export interface GravidKravPatch extends GravidKravRequest {
  aarsakEndring: EndringsAarsak;
}

export const mapGravidKravPatch = (
  fnr: string | undefined,
  orgnr: string | undefined,
  perioder: Array<Periode> | undefined,
  dokumentasjon: string | undefined,
  bekreft: boolean | undefined,
  antallDager: number | undefined,
  aarsakEndring: EndringsAarsak
): GravidKravPatch => {
  const request = mapGravidKravRequest(fnr, orgnr, perioder, dokumentasjon, bekreft, antallDager);

  return {
    identitetsnummer: request.identitetsnummer,
    virksomhetsnummer: request.virksomhetsnummer,
    perioder: request.perioder,
    dokumentasjon: request.dokumentasjon,
    bekreftet: request.bekreftet,
    antallDager: request.antallDager,
    aarsakEndring: aarsakEndring
  };
};
