import dayjs from 'dayjs';

import React from 'react';
import { BodyLong } from '@navikt/ds-react';

interface SoknadMottattProps {
  mottatt: string | undefined;
  className?: string;
}

const SoknadMottatt = (props: SoknadMottattProps) => {
  const formatertMottatt = dayjs(props.mottatt).format('DD.MM.YYYY kl. HH:mm');

  return <BodyLong className={props.className}>Mottatt: {formatertMottatt}</BodyLong>;
};

export default SoknadMottatt;
