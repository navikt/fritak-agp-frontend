import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import KravPeriode from '../../../../api/gravidkrav/KravPeriode';

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
          <Normaltekst key={periode.fom}>
            {formaterDato(periode.fom)} - {formaterDato(periode.tom)}.
          </Normaltekst>
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
