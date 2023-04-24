import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Language, Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import KravEndringKvitteringKeys from './KravEndringKvitteringKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading } from '@navikt/ds-react';

interface KravEndringKvitteringProps {
  backTarget: lenker;
}

const KravEndringKvittering = (props: KravEndringKvitteringProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
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
            <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
          </BodyLong>
        </Panel>
      </Row>
    </Side>
  );
};

export default KravEndringKvittering;
