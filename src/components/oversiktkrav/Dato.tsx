import React from 'react';
import dayjs from 'dayjs';

interface DatoProps {
  dato: Date;
}

export default function Dato(props: DatoProps) {
  const formatertDato: string = dayjs(props.dato).format('DD.MM.YY');
  return <>{formatertDato}</>;
}
