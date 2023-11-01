import React from 'react';
// import { div } from 'nav-frontend-grid';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import KravEndringKvitteringKeys from './KravEndringKvitteringKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading, Link as NLink, Panel } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import Language from '../../locale/Language';

interface KravEndringKvitteringProps {
  backTarget: lenker;
}

const KravEndringKvittering = (props: KravEndringKvitteringProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <div>
        <Panel>
          <Heading size='xlarge' level='1'>
            {t(KravEndringKvitteringKeys.KRAV_ENDRING_KVITTERING_TITTEL)}
          </Heading>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravEndringKvitteringKeys.KRAV_ENDRING_KVITTERING_INGRESS} />
        </Panel>

        <Panel>
          <BodyLong>
            <Link to={backTarget}>{t(KravEndringKvitteringKeys.KRAV_ENDRING_KVITTERING_OPPRETT_NYTT_KRAV)}</Link>
          </BodyLong>
          <BodyLong>
            <NLink href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</NLink>
          </BodyLong>
        </Panel>
      </div>
    </Side>
  );
};

export default KravEndringKvittering;
