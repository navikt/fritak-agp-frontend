import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Link } from 'react-router-dom';
import lenker, { buildLenke } from '../config/lenker';
import Language from '../locale/Language';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { BodyLong, Heading } from '@navikt/ds-react';

const Forside = () => {
  return (
    <Side sidetittel='Søknadsskjemaer' title='Skjema for gravide og kronisk syke' subtitle='Søknadsskjema'>
      <Row>
        <Column md='6'>
          <Heading size='small'>Gravid</Heading>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.Gravid, Language.nb)}>gravide</Link>
          </BodyLong>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.GravidKrav, Language.nb)}>gravide krav</Link>
          </BodyLong>
        </Column>
        <Column md='6'>
          <Heading size='small'>Kronisk</Heading>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.Kronisk, Language.nb)}>kronisk syke</Link>
          </BodyLong>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.KroniskKrav, Language.nb)}>kronisk syke krav</Link>
          </BodyLong>
        </Column>
      </Row>
    </Side>
  );
};

export default Forside;
