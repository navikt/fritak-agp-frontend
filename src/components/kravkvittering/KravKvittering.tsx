import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Side from '../Side';
import lenker from '../lenker';
import InternLenke from '../login/InternLenke';

const KroniskKvittering = () => {
  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering'>
      <Row>
        <Panel>
          <Panel>
            <Sidetittel>Kravet er mottatt</Sidetittel>
          </Panel>

          <Panel>
            <Normaltekst>
              En kvittering er sendt til meldingsboksen deres i <Lenke href='https://www.altinn.no'>Altinn</Lenke>.
            </Normaltekst>
            <Normaltekst>
              Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.
            </Normaltekst>
          </Panel>

          <Panel>
            <Normaltekst>
              <Lenke href='https://loginservice.nav.no/slo'>Logg ut</Lenke>
            </Normaltekst>
            <Normaltekst>
              <Lenke href='/min-side-arbeidsgiver/'>Min side arbeidsgiver</Lenke>
            </Normaltekst>
          </Panel>
        </Panel>
      </Row>
    </Side>
  );
};

export default KroniskKvittering;
