import dayjs from 'dayjs';
import React from 'react';
import KravPeriode from '../../../../api/gravidkrav/KravPeriode';
import { BodyLong } from '@navikt/ds-react';

const formaterDato = (dato: string) => {
  return dayjs(dato).format('DD.MM.YY');
};

interface VisNotifikasjonPerioderProps {
  perioder: KravPeriode[];
}

const VisNotifikasjonPerioder = ({ perioder }: VisNotifikasjonPerioderProps) => {
  return (
    <>
      {perioder.length > 1 ? (
        perioder.map((periode) => (
          <BodyLong key={periode.fom} className='notifikasjon-perioder-liste'>
            {formaterDato(periode.fom)} - {formaterDato(periode.tom)}.
          </BodyLong>
        ))
      ) : (
        <>
          {formaterDato(perioder[0].fom)} - {formaterDato(perioder[0].tom)}.
        </>
      )}
    </>
  );
};

export default VisNotifikasjonPerioder;
