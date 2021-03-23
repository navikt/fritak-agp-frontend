import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Side from '../felles/Side/Side';
import lenker from '../../config/lenker';
import InternLenke from '../felles/InternLenke/InternLenke';

const KroniskKvittering = () => {
  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering'>
      <Row>
        <Panel>
          <Panel>
            <Sidetittel>Søknaden er mottatt</Sidetittel>
          </Panel>

          <Panel>
            <Normaltekst>
              En kvittering er sendt til meldingsboksen deres i <Lenke href='https://www.altinn.no'>Altinn</Lenke>. Den
              ansatte har også fått melding om at søknaden er sendt. Trenger du å kontakte oss, er det tilstrekkelig å
              oppgi fødselsnummeret til den ansatte.
            </Normaltekst>
          </Panel>

          <Panel>
            <AlertStripeInfo>
              Vi anbefaler at bedriften sender selve refusjonskravet før denne søknaden er ferdig behandlet. Da unngår
              dere å oversitte fristen, som er tre måneder.
            </AlertStripeInfo>
          </Panel>

          <Panel>
            <div>
              <InternLenke to={lenker.KroniskKrav}>Send krav om refusjon</InternLenke>
            </div>
            <div>
              <Lenke href='https://loginservice.nav.no/slo'>Logg ut</Lenke>
            </div>
            <div>
              <Lenke href='/min-side-arbeidsgiver/'>Min side arbeidsgiver</Lenke>
            </div>
          </Panel>
        </Panel>
      </Row>
    </Side>
  );
};

export default KroniskKvittering;
