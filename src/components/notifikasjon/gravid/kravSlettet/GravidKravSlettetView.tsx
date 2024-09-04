import React from 'react';
import NotifikasjonInnhold from '../../felles/NotifikasjonInnhold';
import NotifikasjonType from '../../felles/NotifikasjonType';
import formatNumberForCurrency from '../krav/FormatNumberForCurrency';
import GravidKravVisning from '../../../../api/gravidkrav/GravidKravVisning';
import VisNotifikasjonPerioder from '../krav/VisNotifikasjonPerioder';
import { BodyLong } from '@navikt/ds-react';

export interface GravidSoknadNotifikasjonProps {
  gravidKravVisning: GravidKravVisning;
}

const GravidKravSlettetView = ({ gravidKravVisning }: GravidSoknadNotifikasjonProps) => {
  const kravRefusjon = formatNumberForCurrency(gravidKravVisning.totalBelop ?? 0);
  const perioder = gravidKravVisning.perioder;

  const tittel = `${gravidKravVisning.virksomhetsnavn} har slettet et krav.`;

  return (
    <NotifikasjonInnhold title={tittel} type={NotifikasjonType.GravidKravSlettet} dato={gravidKravVisning.opprettet}>
      <BodyLong>
        Arbeidsgiveren din, {gravidKravVisning.virksomhetsnavn}, har tidligere søkt om at NAV skal refundere{' '}
        {kravRefusjon} i sykepenger for
        {perioder.length > 1 ? (
          <> periodene:</>
        ) : (
          <>
            {' '}
            dagene <VisNotifikasjonPerioder perioder={perioder} />
          </>
        )}
      </BodyLong>
      {perioder.length > 1 && <VisNotifikasjonPerioder perioder={perioder} />}

      <BodyLong className='textfelt-padding-bottom'>Dette kravet har nå arbeidsgiveren annullert.</BodyLong>
    </NotifikasjonInnhold>
  );
};

export default GravidKravSlettetView;
