import dayjs from 'dayjs';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

interface SoknadMottattProps {
  mottatt: string | undefined;
  className?: string;
}

const SoknadMottat = (props: SoknadMottattProps) => {
  const formatertMottatt = dayjs(props.mottatt).format('DD.MM.YYYY kl. HH:mm');

  return <Normaltekst className={props.className}>Mottatt: {formatertMottatt}</Normaltekst>;
};

export default SoknadMottat;
