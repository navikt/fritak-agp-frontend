import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Link, useHistory } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { History } from 'history';
import { Column, Container, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import './InnloggetSide.sass';
import { useArbeidsgiver } from '../../context/ArbeidsgiverContext';
import { useEnvironment } from '@navikt/helse-arbeidsgiver-felles-frontend';

interface SideProps {
  children: React.ReactNode;
  className?: string;
  onOrgChange: (org: Organisasjon) => void;
}

const InnloggetSide = (props: SideProps) => {
  const { sideTittel } = useEnvironment();
  const { arbeidsgivere } = useArbeidsgiver();
  const history: History = useHistory();
  return (
    <main className={'innloggetside ' + props.className}>
      {arbeidsgivere.length === 0 && (
        <AlertStripeAdvarsel>
          <p>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</p>
          <p>Tildeling av roller foregår i Altinn</p>
          <Link to='/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'>Les mer om roller og tilganger.</Link>
        </AlertStripeAdvarsel>
      )}
      {arbeidsgivere.length > 0 && (
        <>
          <Bedriftsmeny
            history={history}
            onOrganisasjonChange={(org: Organisasjon) => {
              props.onOrgChange(org);
            }}
            sidetittel={sideTittel}
            organisasjoner={arbeidsgivere}
          />

          <Container>
            <Row>
              <Column>
                <div className={'innloggetside__minside_arbeidsgiver'}>
                  <Lenke href='/min-side-arbeidsgiver/'>&lt;&lt; Min side arbeidsgiver</Lenke>
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
