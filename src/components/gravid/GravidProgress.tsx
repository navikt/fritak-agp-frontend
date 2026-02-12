import React from 'react';
import { useTranslation } from 'react-i18next';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { BodyLong, Box, Heading, Loader } from '@navikt/ds-react';

const GravidProgress = () => {
  const { t } = useTranslation();

  return (
    <Box padding='4' borderRadius='2'>
      <Heading size='small' level='4'>
        {t(GravidKvitteringKeys.GRAVID_KVITTERING_SENDER_INN)}
      </Heading>
      <BodyLong>{t(GravidKvitteringKeys.GRAVID_KVITTERING_VENNLIGST_VENT)}</BodyLong>
      <Loader />
    </Box>
  );
};

export default GravidProgress;
