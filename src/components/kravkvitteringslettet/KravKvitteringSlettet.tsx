import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import KravKvitteringSlettetKeys from './KravKvitteringSlettetKeys';
import { Link, useParams } from 'react-router-dom';
import PathParams from '../../locale/PathParams';
import lenker, { buildLenke } from '../../config/lenker';

interface KravKvitteringSlettetProps {
  backTarget: lenker;
}

const KravKvittering = (props: KravKvitteringSlettetProps) => {
  const { t } = useTranslation();
  const { language } = useParams<PathParams>();
  const backTarget = buildLenke(props.backTarget, language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
        <Panel>
          <Sidetittel>{t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_TITTEL)}</Sidetittel>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_INGRESS} />
        </Panel>

        <Panel>
          <Normaltekst>
            <Link to={backTarget}>{t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_OPPRETT_NYTT_KRAV)}</Link>
          </Normaltekst>
          <Normaltekst>
            <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
          </Normaltekst>
        </Panel>
      </Row>
    </Side>
  );
};

export default KravKvittering;
