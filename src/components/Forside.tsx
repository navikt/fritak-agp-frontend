import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import lenker from './lenker';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';

const Forside = () => {
  return (
    <Row>
      <Column>
        <SoknadTittel>Skjema for gravide og kronisk syke</SoknadTittel>
        <SideIndentering>
          <Row>
            <Column md='6'>
              <Undertittel>Gravid</Undertittel>
              <Normaltekst>
                Gå til skjema for <Link to={lenker.Gravid}>gravide</Link>
              </Normaltekst>
              <Normaltekst>
                Gå til skjema for <Link to={lenker.GravidKrav}>gravide krav</Link>
              </Normaltekst>
            </Column>
            <Column md='6'>
              <Undertittel>Kronisk</Undertittel>
              <Normaltekst>
                Gå til skjema for <Link to={lenker.Kronisk}>kronisk syke</Link>
              </Normaltekst>
            </Column>
          </Row>
        </SideIndentering>
      </Column>
    </Row>
  );
};

export default Forside;
