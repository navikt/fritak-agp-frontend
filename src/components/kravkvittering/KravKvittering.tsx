import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Language, Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { KravKvitteringKeys } from './KravKvitteringKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';

interface KravKvitteringProps {
  backTarget: lenker;
}

const KravKvittering = (props: KravKvitteringProps) => {
  const { t } = useTranslation();
  const { language } = useParams();
  const backTarget = buildLenke(props.backTarget, language as Language);

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
        <Panel>
          <Sidetittel>{t(KravKvitteringKeys.KRAV_KVITTERING_TITTEL)}</Sidetittel>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravKvitteringKeys.KRAV_KVITTERING_INGRESS} />
        </Panel>

        <Panel>
          <Normaltekst>
            <Link to={backTarget}>{t(KravKvitteringKeys.KRAV_KVITTERING_OPPRETT_NYTT_KRAV)}</Link>
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
