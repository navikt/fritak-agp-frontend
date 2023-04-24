import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Language, Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import KravKvitteringSlettetKeys from './KravKvitteringSlettetKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading } from '@navikt/ds-react';

interface KravKvitteringSlettetProps {
  backTarget: lenker;
}

const KravKvitteringSlettet = (props: KravKvitteringSlettetProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
        <Panel>
          <Heading size='xlarge' level='1'>
            {t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_TITTEL)}
          </Heading>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_INGRESS} />
        </Panel>

        <Panel>
          <BodyLong>
            <Link to={backTarget}>{t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_OPPRETT_NYTT_KRAV)}</Link>
          </BodyLong>
          <BodyLong>
            <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
          </BodyLong>
        </Panel>
      </Row>
    </Side>
  );
};

export default KravKvitteringSlettet;
