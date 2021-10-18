import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import { Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import formatNumberForCurrency from './FormatNumberForCurrency';
import GravidKravVisning from '../../../../api/gravidkrav/GravidKravVisning';
import VisNotifikasjonPerioder from './VisNotifikasjonPerioder';
import Lenke from 'nav-frontend-lenker';

export interface GravidSoknadNotifikasjonProps {
  gravidKravVisning: GravidKravVisning;
}

const inTwoWeeks = (dato: string) => {
  return dayjs(dato).add(14, 'days').format('DD.MM.YY');
};

const GravidKravView = ({ gravidKravVisning }: GravidSoknadNotifikasjonProps) => {
  const respondByDate = inTwoWeeks(gravidKravVisning.opprettet);
  const belop = formatNumberForCurrency(gravidKravVisning.totalBelop || 0);
  const perioder = gravidKravVisning.perioder;

  return (
    <NotifikasjonInnhold
      title='Informasjon om sykepenger'
      type={NotifikasjonType.GravidKrav}
      dato={gravidKravVisning.opprettet}
    >
      <Normaltekst className='textfelt-padding-bottom'>
        Arbeidsgiveren din, {gravidKravVisning.virksomhetsnavn}, har søkt om å få igjen {belop} i sykepenger for
        {perioder.length > 1 ? <> periodene </> : <> dagene </>}
        <VisNotifikasjonPerioder perioder={perioder} />
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Hvis det ikke stemmer at du var borte på grunn av sykdom disse dagene, ber vi deg si fra til NAV innen{' '}
        {respondByDate}. Bruk gjerne <Lenke href='https://www.nav.no/skrivtiloss'>Skriv til oss</Lenke> på nav.no. Hører
        vi ikke fra deg, betyr det at du bekrefter opplysningene.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Husk å si fra til arbeidsgiveren din hvis det er noe som er feil.
      </Normaltekst>
      <Normaltekst className='textfelt-padding-bottom'>
        Vi ber deg også si fra dersom du mottar en annen type støtte fra NAV i det samme tidsrommet.
      </Normaltekst>
    </NotifikasjonInnhold>
  );
};

export default GravidKravView;
