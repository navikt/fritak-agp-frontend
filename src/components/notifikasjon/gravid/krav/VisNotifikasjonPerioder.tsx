import { format, parseISO } from 'date-fns';
import React from 'react';
import KravPeriode from '../../../../api/gravidkrav/KravPeriode';

const formaterDato = (dato: string) => {
  return format(parseISO(dato), 'dd.MM.yy');
};

interface VisNotifikasjonPerioderProps {
  perioder: KravPeriode[];
}

const VisNotifikasjonPerioder = ({ perioder }: VisNotifikasjonPerioderProps) => {
  return (
    <>
      {perioder.length > 1 ? (
        <ul>
          {perioder.map((periode) => (
            <li key={periode.fom} className='notifikasjon-perioder-liste'>
              {formaterDato(periode.fom)} - {formaterDato(periode.tom)}
            </li>
          ))}
        </ul>
      ) : (
        <>
          {formaterDato(perioder[0].fom)} - {formaterDato(perioder[0].tom)}.
        </>
      )}
    </>
  );
};

export default VisNotifikasjonPerioder;
