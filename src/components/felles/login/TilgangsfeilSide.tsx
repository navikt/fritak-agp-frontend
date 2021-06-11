import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import LangKey from '../../../locale/LangKey';
import { useTranslation } from 'react-i18next';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const TilgangsfeilSide = () => {
  const { t } = useTranslation();

  return (
    <Side
      className='tilgangsfeil-side'
      sidetittel={t(LangKey.TILGANGSFEIL_SIDETITTEL)}
      title={t(LangKey.TILGANGSFEIL_TITTEL)}
      subtitle={t(LangKey.TILGANGSFEIL_UNDERTITTEL)}
      bedriftsmeny={false}
    >
      <Alertstripe type='feil'>{t(LangKey.TILGANGSFEIL_MELDING)}</Alertstripe>
    </Side>
  );
};
