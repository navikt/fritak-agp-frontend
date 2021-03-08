import React from 'react';
import { GravidSoknadResponse } from '../../../../api/gravid/GravidSoknadResponse';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import { Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';

export interface GravidSoknadNotifikasjonProps {
  gravidSoknadResponse: GravidSoknadResponse;
}

const formaterDato = (dato: string) => {
  return dayjs(dato).format('DD.MM.YY');
};

const GravidSoknadView = ({ gravidSoknadResponse }: GravidSoknadNotifikasjonProps) => {
  const fom = formaterDato(gravidSoknadResponse.periode.fom);
  const tom = formaterDato(gravidSoknadResponse.periode.tom);
  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.GravidKrav}
      dato={gravidSoknadResponse.opprettet}
    >
      <Normaltekst className='textfelt-padding-bottom'>
        Arbeidsgiveren din, {gravidSoknadResponse.virksomhetsnavn}, har søkt om å få igjen kr{' '}
        {gravidSoknadResponse.periode.beloep}i sykepenger for dagene {fom}-{tom}.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Hvis det ikke stemmer at du var borte på grunn av sykdom disse dagene, ber vi deg si fra til NAV innen{' '}
        {gravidSoknadResponse.periode.til}. Hører vi ikke fra deg, betyr det at du bekrefter opplysningene.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Vi ber deg også si fra dersom du mottar en annen type støtte fra NAV i det samme tidsrommet.
      </Normaltekst>
    </NotifikasjonInnhold>
  );
};

export default GravidSoknadView;
