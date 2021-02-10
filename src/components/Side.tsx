import React from 'react';
import { Column, Container, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import './Side.sass';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Link, useHistory } from 'react-router-dom';
import { History } from 'history';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useArbeidsgiver } from '../context/ArbeidsgiverContext';

interface SideProps {
  children: React.ReactNode;
  className?: string;
  sidetittel: string;
  title: string;
  subtitle: string;
  bedriftsmeny?: boolean;
}

const IngenTilgangAdvarsel = () => (
  <AlertStripeAdvarsel>
    <p>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</p>
    <p>Tildeling av roller foregår i Altinn</p>
    <Link to='/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'>Les mer om roller og tilganger.</Link>
  </AlertStripeAdvarsel>
);

const Side = (props: SideProps) => {
  const history: History = useHistory();
  const { arbeidsgivere, setArbeidsgiverId, setFirma } = useArbeidsgiver();
  return (
    <div className={'side ' + props.className}>
      <Bedriftsmeny
        history={history}
        onOrganisasjonChange={(org: Organisasjon) => {
          setArbeidsgiverId(org.OrganizationNumber);
          setFirma(org.Name);
        }}
        sidetittel={props.sidetittel}
        organisasjoner={props.bedriftsmeny ? arbeidsgivere : []}
      />

      <main className={'side ' + props.className}>
        <Container>
          <Row>
            <Column>
              <div className={'side__minside_arbeidsgiver'}>
                <Lenke href='/min-side-arbeidsgiver/'>&lt;&lt; Min side arbeidsgiver</Lenke>
              </div>
            </Column>
          </Row>
        </Container>

        <Container className={'side__innhold'}>
          <Row>
            <Column>
              <SoknadTittel subtitle={props.subtitle}>{props.title}</SoknadTittel>
              <SideIndentering>
                {props.bedriftsmeny === true && arbeidsgivere.length === 0 && <IngenTilgangAdvarsel />}
                {(arbeidsgivere.length > 0 || !props.bedriftsmeny) && props.children}
              </SideIndentering>
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Side;
