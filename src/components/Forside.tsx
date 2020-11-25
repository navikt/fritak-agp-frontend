import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Column, Row } from 'nav-frontend-grid';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';

const Forside = () => {
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Forside</Innholdstittel>
        </Panel>
        <Panel>
          <Normaltekst>
            Gå til skjema for <Link to='./gravid'>gravide</Link>
          </Normaltekst>
          <Normaltekst>
            Gå til skjema for <Link to='./gravid'>kronisk syke</Link>
          </Normaltekst>
        </Panel>
      </Column>
    </Row>
  );
};

export default Forside;
