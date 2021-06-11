import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Side from '../felles/Side/Side';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import Oversettelse from '../felles/Oversettelse/Oversettelse';

const KravKvittering = () => {
  const { t } = useTranslation();

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering'>
      <Row>
        <Panel>
          <Panel>
            <Sidetittel>{t(LangKey.KRAV_KVITTERING_TITTEL)}</Sidetittel>
          </Panel>

          <Panel>
            <Oversettelse langKey={LangKey.KRAV_KVITTERING_INGRESS} />
          </Panel>

          <Panel>
            <Normaltekst>
              <Lenke href='https://loginservice.nav.no/slo'>{t(LangKey.LOGG_UT)}</Lenke>
            </Normaltekst>
            <Normaltekst>
              <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
            </Normaltekst>
          </Panel>
        </Panel>
      </Row>
    </Side>
  );
};

export default KravKvittering;
