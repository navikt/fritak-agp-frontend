import React from 'react';
import { GravidSoknadResponse } from '../../../../api/gravid/GravidSoknadResponse';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import formatOmplassering from './formatOmplassering';
import formatTilrettelegge from './formatTilrettelegge';
import formatDokumentasjon from './formatDokumentasjon';
import formatInnsendtAv from './formatInnsendtAv';
import formatTiltak from './formatTiltak';

export interface GravidSoknadNotifikasjonProps {
  gravidSoknadResponse: GravidSoknadResponse;
}

const GravidSoknadView = ({ gravidSoknadResponse }: GravidSoknadNotifikasjonProps) => {
  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.GravidSoknad}
      dato={gravidSoknadResponse.opprettet}
    >
      <p>
        Arbeidsgiveren din, {gravidSoknadResponse.virksomhetsnummer}, har i dag søkt om utvidet støtte fra NAV angående
        sykepenger til deg. NAV har en egen ordning når sykefraværet blir høyere på grunn av svangerskap. Vanligvis skal
        arbeidsgiveren dekke de første 16 dagene av et sykefravær. Nå søker arbeidsgiveren din om at NAV dekker
        sykepengene dine fra første dag.
      </p>

      <p>
        Du trenger ikke å foreta deg noe i forbindelse med dette. Vi tar kontakt med deg igjen hvis det blir behov for
        det.
      </p>

      <p>Når vi har behandlet søknaden fra arbeidsgiveren din, vil du få en melding fra oss om resultatet.</p>

      <h3>Detaljer fra søknaden:</h3>

      <p>{formatTilrettelegge(gravidSoknadResponse.tilrettelegge)}</p>

      <p>Tiltak forsøkt for at den ansatte skal kunne jobbe:</p>
      {formatTiltak(gravidSoknadResponse.tiltak, gravidSoknadResponse.tiltakBeskrivelse)}

      <p>{formatOmplassering(gravidSoknadResponse.omplassering, gravidSoknadResponse.omplasseringAarsak)}</p>

      <p>{formatDokumentasjon(gravidSoknadResponse.harVedlegg)}</p>
      <p>{formatInnsendtAv(gravidSoknadResponse.sendtAv)}</p>
    </NotifikasjonInnhold>
  );
};

export default GravidSoknadView;
