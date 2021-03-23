import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import lenker from '../config/lenker';
import Side from './felles/Side/Side';

const Forside = () => {
  return (
    <Side sidetittel='Søknadsskjemaer' title='Skjema for gravide og kronisk syke' subtitle='Søknadsskjema'>
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
          <Normaltekst>
            Gå til skjema for <Link to={lenker.KroniskKrav}>kronisk syke krav</Link>
          </Normaltekst>
        </Column>
      </Row>
    </Side>
  );
};

export default Forside;
