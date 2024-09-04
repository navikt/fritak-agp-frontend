import React from 'react';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import { Box, Heading } from '@navikt/ds-react';

const GravidFeil = () => {
  const { t } = useTranslation();

  return (
    <Box padding='4' borderRadius='small'>
      <Heading size='small' level='4'>
        {t(LangKey.DET_OPPSTOD_EN_FEIL)}
      </Heading>
    </Box>
  );
};

export default GravidFeil;
