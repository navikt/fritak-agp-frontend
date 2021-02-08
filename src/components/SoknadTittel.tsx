import Panel from 'nav-frontend-paneler';
import { EtikettLiten, Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import './SoknadTittel.sass';

interface SoknadTittelProps {
  children: any;
  subitle?: string;
}

const SoknadTittel = (props: SoknadTittelProps) => (
  <Panel className='panel--heading'>
    <EtikettLiten>{props.subitle || 'SØKNADSSKJEMA'}</EtikettLiten>
    <Innholdstittel>{props.children}</Innholdstittel>
  </Panel>
);

export default SoknadTittel;
