import Panel from 'nav-frontend-paneler';
import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

const GravidKvittering = () => (
  <Panel className='gravid-soknad-kvittering'>
    <Panel>
      <Sidetittel>Søknaden er mottatt</Sidetittel>
    </Panel>

    <Panel>
      <Normaltekst>
        En kvittering er sendt til meldingsboksen deres i <Lenke href='https://www.altinn.no'>Altinn</Lenke>. Den
        ansatte det gjelder er også varslet om søknaden. Trenger du å kontakte oss, er det tilstrekkelig å oppgi
        fødselsnummeret til den ansatte.
      </Normaltekst>
    </Panel>

    <Panel>
      <Alertstripe type='advarsel'>
        NB: Ikke vent! Vi anbefaler å <Lenke href='/'>stille krav om refusjon</Lenke> så snart som mulig på grunn av at
        foreldelsesfristen for kravet kan bli overskredet mens vi behandler denne søknaden.
      </Alertstripe>
    </Panel>

    <Panel>
      <div>
        <Lenke href='/'>Still krav om refusjon</Lenke>
      </div>
      <div>
        <Lenke href='https://loginservice.nav.no/slo'>Logg ut</Lenke>
      </div>
      <div>
        <Lenke href='/min-side-arbeidsgiver/'>Min side arbeidsgiver</Lenke>
      </div>
    </Panel>
  </Panel>
);

export default GravidKvittering;
