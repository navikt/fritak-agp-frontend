import React from 'react';
// import { div } from 'nav-frontend-grid';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import KravKvitteringSlettetKeys from './KravKvitteringSlettetKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading, Panel, Link as NLink } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import Language from '../../locale/Language';

interface KravKvitteringSlettetProps {
  backTarget: lenker;
}

const KravKvitteringSlettet = (props: KravKvitteringSlettetProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <div>
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
            <NLink href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</NLink>
          </BodyLong>
        </Panel>
      </div>
    </Side>
  );
};

export default KravKvitteringSlettet;
