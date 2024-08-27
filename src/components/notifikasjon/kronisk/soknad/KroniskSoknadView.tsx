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
        Arbeidsgiveren din, {kroniskSoknadResponse.virksomhetsnavn}, har søkt om fritak fra å betale sykepenger for de
        første 16 dagene av sykefraværet ditt. Dette er en ordning NAV har når sykefraværet blir høyere på grunn av
        kronisk/langvarig sykdom. Vanligvis betaler arbeidsgiveren sykepenger de første 16 dagene, men nå søker de om at
        NAV dekker dette fra dag én.
      </p>
      <p>
        Du vil fortsatt motta sykepenger som normalt fra arbeidsgiveren i denne perioden, men arbeidsgiveren vil senere
        få refundert beløpet fra NAV.
      </p>

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
