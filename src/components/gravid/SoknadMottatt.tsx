import { format } from 'date-fns';

import React from 'react';
import { BodyLong } from '@navikt/ds-react';

interface SoknadMottattProps {
  mottatt: string | undefined;
  className?: string;
}

const SoknadMottatt = (props: SoknadMottattProps) => {
  const formatertMottatt = props.mottatt
    ? format(new Date(props.mottatt), 'dd.MM.yyyy') + ' kl. ' + format(new Date(props.mottatt), 'HH:mm')
    : '';

  return <BodyLong className={props.className}>Mottatt: {formatertMottatt}</BodyLong>;
};

export default SoknadMottatt;
