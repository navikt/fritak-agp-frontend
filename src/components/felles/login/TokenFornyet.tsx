import React from 'react';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { TokenFornyetKeys } from './TokenFornyetKeys';
import { BodyLong, Box, Heading } from '@navikt/ds-react';

const TokenFornyet = () => {
  const { t } = useTranslation();
  return (
    <Side
      bedriftsmeny={false}
      sidetittel={t(TokenFornyetKeys.TOKEN_FORNYET_SIDETITTEL)}
      title={t(TokenFornyetKeys.TOKEN_FORNYET_TITLE) as unknown as string}
      subtitle={t(TokenFornyetKeys.TOKEN_FORNYET_LOGIN) as unknown as string}
    >
      <div className={'side__innhold'}>
        <div>
          <Box padding='4' borderRadius='small'>
            <Heading size='large'>{t(TokenFornyetKeys.TOKEN_FORNYET_TITLE)}</Heading>
          </Box>
          <Box padding='4' borderRadius='small'>
            <BodyLong>{t(TokenFornyetKeys.TOKEN_FORNYET_INFO)}</BodyLong>
          </Box>
        </div>
      </div>
    </Side>
  );
};

export default TokenFornyet;
