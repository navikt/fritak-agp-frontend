import { Heading } from '@navikt/ds-react';
import React from 'react';
import './SoknadTittel.sass';

interface SoknadTittelProps {
  children: any;
  subtitle?: string;
}

const SoknadTittel = (props: SoknadTittelProps) => {
  return (
    <div className='panel--heading'>
      <Heading size='small'>{props.subtitle ? props.subtitle.toUpperCase() : '&nbsp;'}</Heading>
      <Heading size='large' level='1'>
        {props.children}
      </Heading>
    </div>
  );
};

export default SoknadTittel;
