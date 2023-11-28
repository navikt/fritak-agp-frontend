import React from 'react';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { KravKvitteringKeys } from './KravKvitteringKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading, Panel, Link as NLink } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import Language from '../../locale/Language';
import environment from '../../config/environment';

interface KravKvitteringProps {
  backTarget: lenker;
}

const KravKvittering = (props: KravKvitteringProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <div>
        <Panel>
          <Heading size='xlarge' level='1'>
            {t(KravKvitteringKeys.KRAV_KVITTERING_TITTEL)}
          </Heading>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravKvitteringKeys.KRAV_KVITTERING_INGRESS} />
        </Panel>

        <Panel>
          <BodyLong>
            <Link to={backTarget}>{t(KravKvitteringKeys.KRAV_KVITTERING_OPPRETT_NYTT_KRAV)}</Link>
          </BodyLong>
          <BodyLong>
            <NLink href={environment.minSideArbeidsgiver}>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</NLink>
          </BodyLong>
        </Panel>
      </div>
    </Side>
  );
};

export default KravKvittering;
