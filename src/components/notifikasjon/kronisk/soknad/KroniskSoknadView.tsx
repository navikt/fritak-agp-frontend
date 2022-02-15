import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';
import formatInnsendtAv from '../../gravid/soknad/formatInnsendtAv';
import formatDokumentasjon from '../../gravid/soknad/formatDokumentasjon';
import formatFravaersdager from './formatFravaersdager';
import './KroniskSoknadView.scss';
import GravidSoknadFooter from '../../gravid/soknad/GravidSoknadFooter';

export interface KroniskSoknadNotifikasjonProps {
  kroniskSoknadResponse: KroniskSoknadResponse;
}

const KroniskSoknadView = ({ kroniskSoknadResponse }: KroniskSoknadNotifikasjonProps) => {
  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.KroniskSoknad}
      dato={kroniskSoknadResponse.opprettet}
    >
      <p>
        Arbeidsgiveren din, {kroniskSoknadResponse.virksomhetsnavn}, har i dag søkt om utvidet støtte fra NAV angående
        sykepenger til deg. NAV har en egen ordning når sykefraværet blir høyere på grunn av kronisk/langvarig sykdom.
        Vanligvis skal arbeidsgiveren dekke de første 16 dagene av et sykefravær. Nå søker arbeidsgiveren din om at NAV
        dekker sykepengene dine fra første dag.
      </p>
      <p>
        Du trenger ikke å foreta deg noe i forbindelse med dette. Vi tar kontakt med deg igjen hvis det blir behov for
        det.
      </p>
      <p>Når vi har behandlet søknaden fra arbeidsgiveren din, vil du få en melding fra oss om resultatet.</p>
      <p>{formatDokumentasjon(kroniskSoknadResponse.harVedlegg)}</p>
      <p>{formatFravaersdager(kroniskSoknadResponse.fravaer)}</p>
      <p>{formatInnsendtAv(kroniskSoknadResponse.sendtAvNavn)}</p>
      <p>
        <GravidSoknadFooter />
      </p>
    </NotifikasjonInnhold>
  );
};

export default KroniskSoknadView;
