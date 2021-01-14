import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import lenker from '../lenker';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

export const KvitteringLink = () => {
  const history: History = useHistory();
  history.push(lenker.KroniskKvittering);
  return <div>Kvittering</div>;
};

const KroniskKvittering = () => {
  return (
    <Row>
      <Panel>
        <Panel>
          <Sidetittel>Kravet er mottatt</Sidetittel>
        </Panel>

        <Panel>
          <Normaltekst>
            En kvittering er sendt til meldingsboksen deres i{' '}
            <Lenke href='https://www.altinn.no'>Altinn</Lenke>. Trenger du å
            kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den
            ansatte.
          </Normaltekst>
        </Panel>

        <Panel>
          <div>
            <Lenke href='https://loginservice.nav.no/slo'>Logg ut</Lenke>
          </div>
          <div>
            <Lenke href='/min-side-arbeidsgiver/'>Min side arbeidsgiver</Lenke>
          </div>
        </Panel>
      </Panel>
    </Row>
  );
};

export default KroniskKvittering;
