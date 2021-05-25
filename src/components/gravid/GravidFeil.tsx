import Panel from 'nav-frontend-paneler';
import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import LangKey from '../../locale/LangKey';

const GravidFeil = () => {
  const { t } = useTranslation();

  return (
  <Panel>
    <Undertittel>{t(LangKey.DET_OPPSTOD_EN_FEIL)}</Undertittel>
  </Panel>
)};

export default GravidFeil;

