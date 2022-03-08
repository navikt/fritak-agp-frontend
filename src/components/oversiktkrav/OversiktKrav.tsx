import React, { useContext, useEffect, useState } from 'react';
import { HttpStatus, ServerFeilAdvarsel, Side, useArbeidsgiver } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Column, Row } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Alert, Table } from '@navikt/ds-react';
import Panel from 'nav-frontend-paneler';
import '@navikt/ds-css';
import Endre from './Endre';
import tilpassOversiktKrav, { KravRad } from './tilpassOversiktKrav';
import Dato from './Dato';
import lenker, { buildLenke } from '../../config/lenker';
import Language from '../../locale/Language';
import { useHistory } from 'react-router-dom';
import { KravListeContext } from '../../context/KravListeContext';
import './OversiktKrav.scss';
import getOversiktKrav from '../../api/oversiktKrav/getOversiktKrav';
import { Paths } from '../../config/Paths';

export default function OversiktKrav(state) {
  const handleCloseServerFeil = () => {};
  const history = useHistory();
  const [krav, setKravet] = useState<KravRad[]>([]);

  const { setAktivtKrav, setKrav } = useContext(KravListeContext);
  const { arbeidsgiverId } = useArbeidsgiver();

  const endreClickHandler = (kravId: string, kravType: string, event: React.FormEvent) => {
    const lenkemal = kravType === 'gravidKrav' ? lenker.GravidKrav : lenker.KroniskKrav;
    const tilLenke = buildLenke(lenkemal, Language.nb);

    event.preventDefault();
    setAktivtKrav(kravId);

    history.push(tilLenke);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kroniskKravRespons = await getOversiktKrav(Paths.KroniskKravOversikt, arbeidsgiverId);
        const gravidKravRespons = await getOversiktKrav(Paths.GravidKravOversikt, arbeidsgiverId);

        if (
          kroniskKravRespons.status === HttpStatus.Successfully &&
          gravidKravRespons.status === HttpStatus.Successfully
        ) {
          const kravRespons = {
            kroniskKrav: kroniskKravRespons.json,
            gravidKrav: gravidKravRespons.json
          };

          setKrav(kravRespons);
          setKravet(tilpassOversiktKrav(gravidKravRespons.json, kroniskKravRespons.json));
        }
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    };

    fetchData();
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
              {krav.length === 0 && <Alert variant='error'>Ingen tidligere krav funnet</Alert>}
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
                          <Endre
                            kravtype={enkeltkrav.kravtype}
                            onClick={(event) => endreClickHandler(enkeltkrav.kravId, enkeltkrav.kravtype, event)}
                          />
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
