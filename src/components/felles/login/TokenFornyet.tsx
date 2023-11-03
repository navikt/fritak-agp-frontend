import React from 'react';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { TokenFornyetKeys } from './TokenFornyetKeys';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';

export const TokenFornyet = () => {
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
          <Panel>
            <Heading size='large'>{t(TokenFornyetKeys.TOKEN_FORNYET_TITLE)}</Heading>
          </Panel>
          <Panel>
            <BodyLong>{t(TokenFornyetKeys.TOKEN_FORNYET_INFO)}</BodyLong>
          </Panel>
        </div>
      </div>
    </Side>
  );
};

export default TokenFornyet;
