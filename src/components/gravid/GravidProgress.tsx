import React from 'react';
import { useTranslation } from 'react-i18next';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';
import { BodyLong, Heading, Loader, Panel } from '@navikt/ds-react';

const GravidProgress = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Heading size='small' level='4'>
        {t(GravidKvitteringKeys.GRAVID_KVITTERING_SENDER_INN)}
      </Heading>
      <BodyLong>{t(GravidKvitteringKeys.GRAVID_KVITTERING_VENNLIGST_VENT)}</BodyLong>
      <Loader />
    </Panel>
  );
};

export default GravidProgress;
