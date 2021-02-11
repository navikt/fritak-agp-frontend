import React from 'react';
import { Column, Container, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import './Side.sass';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { useArbeidsgiver } from '../context/ArbeidsgiverContext';
import { IngenTilgangAdvarsel } from './login/IngenTilgangAdvarsel';

interface SideProps {
  children: React.ReactNode;
  className?: string;
  sidetittel: string;
  title: string;
  subtitle: string;
  bedriftsmeny?: boolean;
}

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
                {!skalSkjule(props.bedriftsmeny, arbeidsgivere) && props.children}
                {skalSkjule(props.bedriftsmeny, arbeidsgivere) && <IngenTilgangAdvarsel />}
              </SideIndentering>
            </Column>
          </Row>
        </Container>
      </main>
    </div>
  );
};

const skalSkjule = (bedriftsmeny: boolean | undefined, arbeidsgivere: Array<Organisasjon>) => {
  return arbeidsgivere.length === 0 && bedriftsmeny === true;
};

export default Side;
