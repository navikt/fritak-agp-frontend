import Panel from 'nav-frontend-paneler';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';
import { Heading } from '@navikt/ds-react';

const GravidFeil = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Heading size='small' level='4'>
        {t(LangKey.DET_OPPSTOD_EN_FEIL)}
      </Heading>
    </Panel>
  );
};

export default GravidFeil;
