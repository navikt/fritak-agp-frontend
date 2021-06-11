import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Container, Row } from 'nav-frontend-grid';
import { useTranslation } from 'react-i18next';
import LangKey from '../../../locale/LangKey';
import Oversettelse from '../Oversettelse/Oversettelse';
import { Side } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const TokenFornyet = () => {
  const { t } = useTranslation();

  return (
    <Side
      bedriftsmeny={false}
      sidetittel={t(LangKey.TOKEN_FORNYET_SIDETITTEL)}
      title={t(LangKey.TOKEN_FORNYET_TITTEL)}
      subtitle={t(LangKey.TOKEN_FORNYET_UNDERTITTEL)}
    >
      <Container className={'side__innhold'}>
        <Row>
          <Panel>
            <Innholdstittel>{t(LangKey.TOKEN_FORNYET_INNHOLDSTITTEL)}</Innholdstittel>
          </Panel>
          <Panel>
            <Oversettelse langKey={LangKey.TOKEN_FORNYET_TEKST} />
          </Panel>
        </Row>
      </Container>
    </Side>
  );
};

export default TokenFornyet;
