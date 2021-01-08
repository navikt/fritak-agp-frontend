import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

const Kvittering = () => {
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Kronisk</Innholdstittel>
        </Panel>
        <Panel>
          <Normaltekst>Kommer...</Normaltekst>
        </Panel>
      </Column>
    </Row>
  );
};

export default Kvittering;
