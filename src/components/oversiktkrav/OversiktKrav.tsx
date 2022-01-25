import React from 'react';
import { ServerFeilAdvarsel, Side } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Column, Row } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Table } from '@navikt/ds-react';
import Panel from 'nav-frontend-paneler';
import '@navikt/ds-css';
import Endre from './Endre';
import tilpassOversiktKrav, { KravRad } from './tilpassOversiktKrav';
import mockKravliste from '../../mockData/mockKravliste';
import Dato from './Dato';

export default function OversiktKrav(state) {
  const handleCloseServerFeil = () => {};

  const krav: KravRad[] = tilpassOversiktKrav(mockKravliste);

  return (
    <Side
      bedriftsmeny={false}
      className='kroniskkrav'
      sidetittel='Kravoversikt'
      title='Kravoversikt'
      subtitle='Oversikt over innsendte krav'
    >
      <ServerFeilAdvarsel isOpen={state.serverError} onClose={handleCloseServerFeil} />
      <Row className='kravliste'>
        <Column>
          <Row>
            <Panel>
              <Innholdstittel className='kravliste-tittel'>Tidligere innsendte krav</Innholdstittel>
            </Panel>
          </Row>
          <Row>
            <Panel>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell scope='col'>Innsendt</Table.HeaderCell>
                    <Table.HeaderCell scope='col'>Fødselsnummer</Table.HeaderCell>
                    <Table.HeaderCell scope='col'>Navn</Table.HeaderCell>
                    <Table.HeaderCell scope='col'></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {krav.map((enkeltkrav) => (
                    <Table.Row key={enkeltkrav.kravId}>
                      <Table.DataCell>
                        <Dato dato={enkeltkrav.opprettet} />
                      </Table.DataCell>
                      <Table.DataCell>{enkeltkrav.fnr}</Table.DataCell>
                      <Table.DataCell>{enkeltkrav.navn}</Table.DataCell>
                      <Table.DataCell>
                        <Endre />
                      </Table.DataCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Panel>
          </Row>
        </Column>
      </Row>
    </Side>
  );
}
