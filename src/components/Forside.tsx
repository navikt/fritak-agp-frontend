import React from 'react';
import { Link } from 'react-router-dom';
import lenker, { buildLenke } from '../config/lenker';
import Language from '../locale/Language';

import { BodyLong, Heading } from '@navikt/ds-react';
import Side from './felles/Side/Side';

import './Forside.scss';

const Forside = () => {
  return (
    <Side sidetittel='Søknadsskjemaer' title='Skjema for gravide og kronisk syke' subtitle='Søknadsskjema'>
      <div>
        <div className='forside--kolonne'>
          <Heading size='small' level='2'>
            Gravid
          </Heading>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.Gravid, Language.nb)}>gravide</Link>
          </BodyLong>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.GravidKrav, Language.nb)}>gravide krav</Link>
          </BodyLong>
        </div>
        <div className='forside--kolonne'>
          <Heading size='small' level='2'>
            Kronisk
          </Heading>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.Kronisk, Language.nb)}>kronisk syke</Link>
          </BodyLong>
          <BodyLong>
            Gå til skjema for <Link to={buildLenke(lenker.KroniskKrav, Language.nb)}>kronisk syke krav</Link>
          </BodyLong>
        </div>
      </div>
    </Side>
  );
};

export default Forside;
