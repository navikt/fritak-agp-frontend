import Panel from 'nav-frontend-paneler';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { GravidKvitteringKeys } from './GravidKvitteringKeys';

const GravidProgress = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Undertittel>{t(GravidKvitteringKeys.GRAVID_KVITTERING_SENDER_INN)}</Undertittel>
      <Normaltekst>{t(GravidKvitteringKeys.GRAVID_KVITTERING_VENNLIGST_VENT)}</Normaltekst>
      <NavFrontendSpinner />
    </Panel>
  );
};

export default GravidProgress;
