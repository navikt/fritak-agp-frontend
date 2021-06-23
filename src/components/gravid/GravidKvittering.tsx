import Panel from 'nav-frontend-paneler';
import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import lenker, { buildLenke } from '../../config/lenker';
import LangKey from '../../locale/LangKey';
import { Oversettelse } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { useParams } from 'react-router-dom';
import PathParams from '../../locale/PathParams';

const GravidKvittering = () => {
  const { language } = useParams<PathParams>();

  return (
    <Panel className='gravid-soknad-kvittering'>
      <Panel>
        <Sidetittel>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_TITTEL} />
        </Sidetittel>
      </Panel>

      <Panel>
        <Normaltekst>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_INGRESS} />
        </Normaltekst>
      </Panel>

      <Panel>
        <Alertstripe type='advarsel'>
          <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_ADVARSEL} />
        </Alertstripe>
      </Panel>

      <Panel>
        <div>
          <Lenke href={buildLenke(lenker.GravidKrav, language)}>
            <Oversettelse langKey={GravidKvitteringKeys.GRAVID_KVITTERING_KRAV} />
          </Lenke>
        </div>
        <div>
          <Lenke href='https://loginservice.nav.no/slo'>
            <Oversettelse langKey={LangKey.LOGG_UT} />
          </Lenke>
        </div>
        <div>
          <Lenke href='/min-side-arbeidsgiver/'>
            <Oversettelse langKey={LangKey.MIN_SIDE_ARBEIDSGIVER} />
          </Lenke>
        </div>
      </Panel>
    </Panel>
  );
};

export default GravidKvittering;
