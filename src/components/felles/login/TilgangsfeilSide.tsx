import React from 'react';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { TilgangsfeilSideKeys } from './TilgangsfeilSideKeys';
import { Alert } from '@navikt/ds-react';

const TilgangsfeilSide = () => {
  const { t } = useTranslation();
  return (
    <Side
      className='tilgangsfeil-side'
      sidetittel={t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_DENIED) as unknown as string}
      subtitle={t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_ERROR) as unknown as string}
      bedriftsmeny={false}
    >
      <Alert variant='error'>{t(TilgangsfeilSideKeys.TILGANGSFEILSIDE_LOGIN)}</Alert>
    </Side>
  );
};

export default TilgangsfeilSide;
