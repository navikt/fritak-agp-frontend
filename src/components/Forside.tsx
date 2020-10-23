import React from 'react';
import Lenke from "nav-frontend-lenker";
import Panel from "nav-frontend-paneler";
import {Column, Row} from "nav-frontend-grid";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";

const Forside = () => {
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Forside</Innholdstittel>
        </Panel>
        <Panel>
          <Normaltekst>
            Gå til skjema for <Lenke href="/gravid">gravide</Lenke>
          </Normaltekst>
          <Normaltekst>
            Gå til skjema for <Lenke href="/kronisk">kronisk syke</Lenke>
          </Normaltekst>
        </Panel>
      </Column>
    </Row>
  );
};

export default Forside;
