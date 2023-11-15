import React from 'react';
import { GravidSoknadResponse } from '../../../../api/gravid/GravidSoknadResponse';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import formatOmplassering from './formatOmplassering';
import formatTilrettelegge from './formatTilrettelegge';
import formatTiltak from './formatTiltak';
import GravidSoknadFooter from './GravidSoknadFooter';
import InnsendtAv from './InnsendtAv';
import Dokumentasjon from './Dokumentasjon';

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
        Arbeidsgiveren din, {gravidSoknadResponse.virksomhetsnavn}, har i dag søkt om utvidet støtte fra NAV når det
        gjelder sykepenger til deg. NAV har en egen ordning når sykefraværet blir høyere på grunn av svangerskap.
        Vanligvis skal arbeidsgiveren betale de første 16 dagene av et sykefravær. Nå søker arbeidsgiveren din om at NAV
        betaler sykepengene dine fra første dag.
      </p>

      <p>
        Du trenger ikke gjøre noe i forbindelse med dette. Vi tar kontakt med deg igjen hvis det blir behov for det.
      </p>

      <p>Når vi har behandlet søknaden fra arbeidsgiveren din, vil du få en melding fra oss om resultatet.</p>

      <h3>Detaljer fra søknaden:</h3>

      <p>{formatTilrettelegge(gravidSoknadResponse.tilrettelegge)}</p>

      {gravidSoknadResponse.tiltak && gravidSoknadResponse.tiltak.length > 0 && (
        <>
          <p>Tiltak forsøkt for at den ansatte skal kunne jobbe:</p>
          {formatTiltak(gravidSoknadResponse.tiltak, gravidSoknadResponse.tiltakBeskrivelse)}
        </>
      )}

      <p>{formatOmplassering(gravidSoknadResponse.omplassering, gravidSoknadResponse.omplasseringAarsak)}</p>

      <p>
        <Dokumentasjon harVedlegg={gravidSoknadResponse.harVedlegg} />
      </p>
      <p>
        <InnsendtAv sendtAv={gravidSoknadResponse.sendtAvNavn} />
      </p>
      <p>
        <GravidSoknadFooter />
      </p>
    </NotifikasjonInnhold>
  );
};

export default GravidSoknadView;
