import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { TilgangsfeilSideKeys } from './TilgangsfeilSideKeys';

export const TilgangsfeilSide = () => {
  const { t } = useTranslation();
  return (
    <Side
      className='tilgangsfeil-side'
      sidetittel={t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_DENIED) as unknown as string}
      subtitle={t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_ERROR) as unknown as string}
      bedriftsmeny={false}
    >
      <Alertstripe type='feil'>{t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_LOGIN)}</Alertstripe>
    </Side>
  );
};

export default TilgangsfeilSide;
