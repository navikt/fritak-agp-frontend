import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Container, Row } from 'nav-frontend-grid';
import { useTranslation } from 'react-i18next';
import Side from '../Side/Side';
import { TokenFornyetKeys } from './TokenFornyetKeys';
import { Panel } from '@navikt/ds-react';

export const TokenFornyet = () => {
  const { t } = useTranslation();
  return (
    <Side
      bedriftsmeny={false}
      sidetittel={t(TokenFornyetKeys.TOKEN_FORNYET_SIDETITTEL)}
      title={t(TokenFornyetKeys.TOKEN_FORNYET_TITLE) as unknown as string}
      subtitle={t(TokenFornyetKeys.TOKEN_FORNYET_LOGIN) as unknown as string}
    >
      <Container className={'side__innhold'}>
        <Row>
          <Panel>
            <Innholdstittel>{t(TokenFornyetKeys.TOKEN_FORNYET_TITLE)}</Innholdstittel>
          </Panel>
          <Panel>
            <Normaltekst>{t(TokenFornyetKeys.TOKEN_FORNYET_INFO)}</Normaltekst>
          </Panel>
        </Row>
      </Container>
    </Side>
  );
};

export default TokenFornyet;
