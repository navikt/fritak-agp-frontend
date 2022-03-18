import React, { useContext, useEffect, useState } from 'react';
import { HttpStatus, ServerFeilAdvarsel, Side, useArbeidsgiver } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Column, Row } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Alert, Table } from '@navikt/ds-react';
import Panel from 'nav-frontend-paneler';
import '@navikt/ds-css';
import tilpassOversiktKrav, { KravRad } from './tilpassOversiktKrav';
import Dato from './Dato';
import { KravListeContext } from '../../context/KravListeContext';
import './OversiktKrav.scss';
import getOversiktKrav from '../../api/oversiktKrav/getOversiktKrav';
import { Paths } from '../../config/Paths';

export default function OversiktKrav(state) {
  const handleCloseServerFeil = () => {};
  const [krav, setKravet] = useState<KravRad[]>([]);
  const [henterData, setHenterData] = useState<boolean>(true);

  const { setKrav } = useContext(KravListeContext);
  const { arbeidsgiverId } = useArbeidsgiver();

  useEffect(() => {
    const fetchData = async () => {
      let kroniskKravRespons;
      try {
        const kravRespons = await getOversiktKrav(Paths.KroniskKravOversikt, arbeidsgiverId);
        if (kravRespons.status === HttpStatus.Successfully) {
          kroniskKravRespons = kravRespons.json;
        } else {
          kroniskKravRespons = [];
        }
      } catch (error) {
        kroniskKravRespons = [];
      }

      let gravidKravRespons;
      try {
        const kravRespons = await getOversiktKrav(Paths.GravidKravOversikt, arbeidsgiverId);
        if (kravRespons.status === HttpStatus.Successfully) {
          gravidKravRespons = kravRespons.json;
        } else {
          gravidKravRespons = [];
        }
      } catch (error) {
        gravidKravRespons = [];
      } finally {
        setHenterData(false);
      }

      const kravRespons = {
        kroniskKrav: kroniskKravRespons,
        gravidKrav: gravidKravRespons
      };

      setKrav(kravRespons);
      setKravet(tilpassOversiktKrav(gravidKravRespons, kroniskKravRespons));
    };
    if (arbeidsgiverId) {
      fetchData();
    }
  }, [arbeidsgiverId]); // eslint-disable-line

  return (
    <Side
      bedriftsmeny={true}
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
              {krav.length === 0 && !henterData && <Alert variant='error'>Ingen tidligere krav funnet</Alert>}
              {krav.length > 0 && (
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
                        <Table.DataCell className='last-table-cell'>
                          <a
                            href={
                              '/fritak-agp/nb/' +
                              enkeltkrav.kravtype.split(/(?=[A-Z])/)[0] +
                              '/krav/' +
                              enkeltkrav.kravId
                            }
                          >
                            Endre {enkeltkrav.kravtype.split(/(?=[A-Z])/)[0]}
                          </a>
                        </Table.DataCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Panel>
          </Row>
        </Column>
      </Row>
    </Side>
  );
}
