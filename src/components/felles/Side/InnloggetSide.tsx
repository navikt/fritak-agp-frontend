import React from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Column, Container, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import './InnloggetSide.css';
import { useArbeidsgiver } from '../../../context/arbeidsgiver/ArbeidsgiverContext';
import { useTranslation } from 'react-i18next';
import { IngenTilgangAdvarsel } from '../login/IngenTilgangAdvarsel';
import { InnloggetSideKeys } from './InnloggetSideKeys';

interface SideProps {
  children: React.ReactNode;
  className?: string;
  sideTittel: string;
}

const InnloggetSide = (props: SideProps) => {
  const { t } = useTranslation();
  const { arbeidsgivere, setArbeidsgiverId, setFirma } = useArbeidsgiver();

  return (
    <main className={'innloggetside ' + props.className}>
      {arbeidsgivere.length === 0 && <IngenTilgangAdvarsel />}
      {arbeidsgivere.length > 0 && (
        <>
          <Bedriftsmeny
            onOrganisasjonChange={(org: Organisasjon) => {
              setArbeidsgiverId(org.OrganizationNumber);
              setFirma(org.Name);
            }}
            sidetittel={props.sideTittel}
            organisasjoner={arbeidsgivere}
          />

          <Container>
            <Row>
              <Column>
                <div className={'innloggetside__minside_arbeidsgiver'}>
                  <Lenke href='/min-side-arbeidsgiver/'>&lt;&lt; {t(InnloggetSideKeys.INNLOGGET_SIDE_MIN_SIDE)}</Lenke>
                </div>
              </Column>
            </Row>
          </Container>

          <Container className={'innloggetside__innhold'}>{props.children}</Container>
        </>
      )}
    </main>
  );
};

export default InnloggetSide;
