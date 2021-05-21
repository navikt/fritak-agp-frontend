import Panel from 'nav-frontend-paneler';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import './SoknadTittel.sass';

interface SoknadTittelProps {
  children: any;
  subtitle?: string;
}

const SoknadTittel = (props: SoknadTittelProps) => (
  <Panel className='panel--heading'>
    <Normaltekst>{props.subtitle ? props.subtitle.toUpperCase() : 'SØKNADSSKJEMA'}</Normaltekst>
    <Innholdstittel>{props.children}</Innholdstittel>
  </Panel>
);

export default SoknadTittel;
