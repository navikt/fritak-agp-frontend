import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import KroniskSoknadResponse from '../../../../api/kronisk/KroniskSoknadResponse';
import './KroniskSoknadView.scss';
import GravidSoknadFooter from '../../gravid/soknad/GravidSoknadFooter';
import Fravaersdager from './Fravaersdager';
import InnsendtAv from '../../gravid/soknad/InnsendtAv';
import Dokumentasjon from '../../gravid/soknad/Dokumentasjon';

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
      <p>
        <Dokumentasjon harVedlegg={kroniskSoknadResponse.harVedlegg} />
      </p>
      <p>
        <Fravaersdager maanedsfravaer={kroniskSoknadResponse.fravaer} />
      </p>
      <p>
        <InnsendtAv sendtAv={kroniskSoknadResponse.sendtAvNavn} />
      </p>
      <p>
        <GravidSoknadFooter />
      </p>
    </NotifikasjonInnhold>
  );
};

export default KroniskSoknadView;
