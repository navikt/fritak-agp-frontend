import Panel from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { BodyLong, Heading } from '@navikt/ds-react';

const GravidProgress = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Heading size='small'>{t(GravidKvitteringKeys.GRAVID_KVITTERING_SENDER_INN)}</Heading>
      <BodyLong>{t(GravidKvitteringKeys.GRAVID_KVITTERING_VENNLIGST_VENT)}</BodyLong>
      <NavFrontendSpinner />
    </Panel>
  );
};

export default GravidProgress;
