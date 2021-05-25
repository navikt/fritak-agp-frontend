import Panel from 'nav-frontend-paneler';
import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import Oversettelse from '../felles/Oversettelse/Oversettelse';

const GravidKvittering = () => {
  return (
    <Panel className='gravid-soknad-kvittering'>
      <Panel>
        <Sidetittel><Oversettelse langKey={LangKey.GRAVID_KVITTERING_TITTEL}/></Sidetittel>
      </Panel>

      <Panel>
        <Normaltekst>
          <Oversettelse langKey={LangKey.GRAVID_KVITTERING_INGRESS}/>
        </Normaltekst>
      </Panel>

      <Panel>
        <Alertstripe type='advarsel'>
          <Oversettelse langKey={LangKey.GRAVID_KVITTERING_ADVARSEL} />
        </Alertstripe>
      </Panel>

      <Panel>
        <div>
          <Lenke href={lenker.GravidKrav}><Oversettelse langKey={LangKey.GRAVID_KVITTERING_KRAV} /></Lenke>
        </div>
        <div>
          <Lenke href='https://loginservice.nav.no/slo'><Oversettelse langKey={LangKey.LOGG_UT} /></Lenke>
        </div>
        <div>
          <Lenke href='/min-side-arbeidsgiver/'><Oversettelse langKey={LangKey.MIN_SIDE_ARBEIDSGIVER} /></Lenke>
        </div>
      </Panel>
    </Panel>
  );
};

export default GravidKvittering;
