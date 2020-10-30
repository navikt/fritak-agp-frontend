import Panel from "nav-frontend-paneler";
import React from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import NavFrontendSpinner from "nav-frontend-spinner";

const GravidKvittering = () => (
  <Panel>
    <Undertittel>Takk</Undertittel>
    <Normaltekst>Din søknad er mottatt.</Normaltekst>
    <NavFrontendSpinner/>
  </Panel>
)

export default GravidKvittering;
