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
  const tittel = `${gravidSoknadResponse.virksomhetsnavn} har søkt om at NAV dekker sykepenger fra første dag av eventuelt sykefravær.`;
  return (
    <NotifikasjonInnhold title={tittel} type={NotifikasjonType.GravidSoknad} dato={gravidSoknadResponse.opprettet}>
      <p>
        Arbeidsgiveren din, {gravidSoknadResponse.virksomhetsnavn}, har søkt om fritak fra å betale sykepenger for de
        første 16 dagene av sykefraværet ditt. Dette er en ordning NAV har når sykefraværet blir høyere på grunn av
        svangerskap. Vanligvis betaler arbeidsgiveren sykepenger de første 16 dagene, men nå søker de om at NAV dekker
        dette fra dag én.
      </p>

      <p>
        Du vil fortsatt motta sykepenger som normalt fra arbeidsgiveren i denne perioden, men arbeidsgiveren vil senere
        få refundert beløpet fra NAV.
      </p>

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
        Du trenger ikke gjøre noe i denne saken. Vi tar kontakt med deg hvis det blir nødvendig. Når vi har behandlet
        søknaden, vil du få beskjed om resultatet.
      </p>
      <p>
        <GravidSoknadFooter />
      </p>
    </NotifikasjonInnhold>
  );
};

export default GravidSoknadView;
