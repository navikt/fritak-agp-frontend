import React from 'react';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import KravKvitteringSlettetKeys from './KravKvitteringSlettetKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading, Link as NLink, Box } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import Language from '../../locale/Language';
import environment from '../../config/environment';

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
        <Box padding='4' borderRadius='small'>
          <Heading size='xlarge' level='1'>
            {t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_TITTEL)}
          </Heading>
        </Box>

        <Box padding='4' borderRadius='small'>
          <Oversettelse langKey={KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_INGRESS} />
        </Box>

        <Box padding='4' borderRadius='small'>
          <BodyLong>
            <Link to={backTarget}>{t(KravKvitteringSlettetKeys.KRAV_KVITTERING_SLETTET_OPPRETT_NYTT_KRAV)}</Link>
          </BodyLong>
          <BodyLong>
            <NLink href={environment.minSideArbeidsgiver}>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</NLink>
          </BodyLong>
        </Box>
      </div>
    </Side>
  );
};

export default KravKvitteringSlettet;
