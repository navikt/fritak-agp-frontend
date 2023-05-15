import { Panel } from '@navikt/ds-react';
import { Undertittel, Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';

interface SoknadTittelProps {
  children: any;
  subtitle?: string;
}

const SoknadTittel = (props: SoknadTittelProps) => {
  return (
    <Panel className='panel--heading'>
      <Undertittel>{props.subtitle ? props.subtitle.toUpperCase() : '&nbsp;'}</Undertittel>
      <Innholdstittel>{props.children}</Innholdstittel>
    </Panel>
  );
};

export default SoknadTittel;
