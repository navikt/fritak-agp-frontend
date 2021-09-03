import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import { Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import formatNumberForCurrency from './FormatNumberForCurrency';
import GravidKravVisning from '../../../../api/gravidkrav/GravidKravVisning';

export interface GravidSoknadNotifikasjonProps {
  gravidKravVisning: GravidKravVisning;
}

const formaterDato = (dato: string) => {
  return dayjs(dato).format('DD.MM.YY');
};

const inTwoWeeks = (dato: string) => {
  return dayjs(dato).add(14, 'days').format('DD.MM.YY');
};

const GravidKravView = ({ gravidKravVisning }: GravidSoknadNotifikasjonProps) => {
  const fom = formaterDato(gravidKravVisning.periode.fom);
  const tom = formaterDato(gravidKravVisning.periode.tom);
  const respondByDate = inTwoWeeks(gravidKravVisning.opprettet);
  const belop = formatNumberForCurrency(gravidKravVisning.periode.belop);

  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.GravidKrav}
      dato={gravidKravVisning.opprettet}
    >
      <Normaltekst className='textfelt-padding-bottom'>
        Arbeidsgiveren din, {gravidKravVisning.virksomhetsnavn}, har søkt om å få igjen {belop} i sykepenger for dagene{' '}
        {fom} - {tom}.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Hvis det ikke stemmer at du var borte på grunn av sykdom disse dagene, ber vi deg si fra til NAV innen{' '}
        {respondByDate}. Hører vi ikke fra deg, betyr det at du bekrefter opplysningene.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Vi ber deg også si fra dersom du mottar en annen type støtte fra NAV i det samme tidsrommet.
      </Normaltekst>
    </NotifikasjonInnhold>
  );
};

export default GravidKravView;
