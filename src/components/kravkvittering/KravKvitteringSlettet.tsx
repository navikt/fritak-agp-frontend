import React from 'react';
import { Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Oversettelse, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { KravKvitteringSlettetKeys } from './KravKvitteringSlettetKeys';

const KravKvitteringSlettet = () => {
  const { t } = useTranslation();

  return (
    <Side sidetittel='Søknadsskjema' className='kronisk-kvittering' bedriftsmeny={false}>
      <Row>
        <Panel>
          <Sidetittel>{t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_TITTEL)}</Sidetittel>
        </Panel>

        <Panel>
          <Oversettelse langKey={KravKvitteringSlettetKeys.KRAV_KVITTERING_INGRESS} />
        </Panel>

        <Panel>
          <Normaltekst>
            <Lenke href='/min-side-arbeidsgiver/'>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</Lenke>
          </Normaltekst>
        </Panel>
      </Row>
    </Side>
  );
};

export default KravKvitteringSlettet;
