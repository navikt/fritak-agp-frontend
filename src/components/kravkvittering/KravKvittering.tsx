import React from 'react';
import LangKey from '../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { KravKvitteringKeys } from './KravKvitteringKeys';
import { Link, useParams } from 'react-router-dom';
import lenker, { buildLenke } from '../../config/lenker';
import { BodyLong, Heading, Link as NLink, Box } from '@navikt/ds-react';
import Oversettelse from '../felles/Oversettelse/Oversettelse';
import Side from '../felles/Side/Side';
import { Language } from '../../locale/Language';
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
        <Box padding='4' borderRadius='small'>
          <Heading size='xlarge' level='1'>
            {t(KravKvitteringKeys.KRAV_KVITTERING_TITTEL)}
          </Heading>
        </Box>

        <Box padding='4' borderRadius='small'>
          <Oversettelse langKey={KravKvitteringKeys.KRAV_KVITTERING_INGRESS} />
        </Box>

        <Box padding='4' borderRadius='small'>
          <BodyLong>
            <Link to={backTarget}>{t(KravKvitteringKeys.KRAV_KVITTERING_OPPRETT_NYTT_KRAV)}</Link>
          </BodyLong>
          <BodyLong>
            <NLink href={environment.minSideArbeidsgiver}>{t(LangKey.MIN_SIDE_ARBEIDSGIVER)}</NLink>
          </BodyLong>
        </Box>
      </div>
    </Side>
  );
};

export default KravKvittering;
