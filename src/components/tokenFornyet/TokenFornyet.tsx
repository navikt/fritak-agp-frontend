import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Container, Row } from 'nav-frontend-grid';
import Side from '../Side';

export const TokenFornyet = () => (
  <Side>
    <Container className={'side__innhold'}>
      <Row>
        <Panel>
          <Innholdstittel>Innloggingen er fornyet</Innholdstittel>
        </Panel>
        <Panel>
          <Normaltekst>Du har nå fornyet innloggingen med en time.</Normaltekst>
          <Normaltekst>Dette vinduet kan nå lukkes.</Normaltekst>
        </Panel>
      </Row>
    </Container>
  </Side>
);

export default TokenFornyet;
