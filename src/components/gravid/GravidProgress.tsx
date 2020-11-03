import Panel from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

const GravidProgress = () => (
  <Panel>
    <Undertittel>Vi sender inn søknaden</Undertittel>
    <Normaltekst>Vennligst vent...</Normaltekst>
    <NavFrontendSpinner/>
  </Panel>
)

export default GravidProgress;
