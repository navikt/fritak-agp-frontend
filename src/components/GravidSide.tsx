import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

const GravidSide = () => {
  return (
    <Row>
      <Column>
        <Panel>
          <Innholdstittel>Søknad om utvidet støtte for gravid ansatts sykefravære</Innholdstittel>
        </Panel>
        <Panel>
          <Normaltekst>
            Kommer...
          </Normaltekst>
        </Panel>
      </Column>
    </Row>
  );
};

export default GravidSide;
