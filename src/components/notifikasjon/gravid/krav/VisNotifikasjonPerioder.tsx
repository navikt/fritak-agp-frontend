import dayjs from 'dayjs';
import React from 'react';
import KravPeriode from '../../../../api/gravidkrav/KravPeriode';
import KravPeriodeMedDelperiode from '../../../../api/gravidkrav/KravPeriodeMedDelperiode';
import { BodyLong } from '@navikt/ds-react';

const formaterDato = (dato: string) => {
  return dayjs(dato).format('DD.MM.YY');
};

interface VisNotifikasjonPerioderProps {
  perioder: Array<KravPeriode | KravPeriodeMedDelperiode>;
}

const VisNotifikasjonPerioder = ({ perioder }: VisNotifikasjonPerioderProps) => {
  return perioder.map((periode) => {
    if (isKravPeriodeMedDelperiode(periode)) {
      return periode.perioder.map((delperiode) => (
        <BodyLong key={delperiode.fom}>
          {formaterDato(delperiode.fom)} - {formaterDato(delperiode.tom)}.
        </BodyLong>
      ));
    } else {
      return (
        <BodyLong key={periode.fom}>
          {formaterDato(periode.fom)} - {formaterDato(periode.tom)}.
        </BodyLong>
      );
    }
  });
};

export default VisNotifikasjonPerioder;

function isKravPeriodeMedDelperiode(object: any): object is KravPeriodeMedDelperiode {
  return 'perioder' in object;
}
