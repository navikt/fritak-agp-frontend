import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../lenker';
import NotifikasjonType from './NotifikasjonType';
import Panel from 'nav-frontend-paneler';
import dayjs from 'dayjs';
import './NotifikasjonInnhold.sass';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

interface NotifikasjonInnholdProps {
  children: any;
  title: string;
  dato?: string;
  type: NotifikasjonType;
}

const GravidSoknadFooter = () => (
  <Lenke href='https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/sykepenger/kronisk-syk-arbeidstaker'>
    Om du vil, kan du lese om arbeidsgiverens rett til å få dekket utgiftene.
  </Lenke>
);

const NotifikasjonInnhold = (props: NotifikasjonInnholdProps) => {
  return (
    <div className='notifikasjon-innhold'>
      <Row>
        <Column>
          <div className={'notifikasjon-innhold__path'}>
            <Lenke href='/min-side-arbeidsgiver/'>Ditt NAV / </Lenke>
            <Lenke href={lenker.Notifikasjon}>Beskjeder / </Lenke>
            <Lenke href=''>Din arbeidsgiver har søkt om utvidet støtte</Lenke>
          </div>
        </Column>
      </Row>
      <Row>
        <Column>
          <Panel className='notifikasjon-innhold__hvit'>
            <Row>
              <Column>
                <Innholdstittel>{props.title}</Innholdstittel>
                <Normaltekst>{dayjs(props.dato).format('DD.MM.YYYY')}</Normaltekst>
              </Column>
            </Row>

            <Row>
              <Column className='notifikasjon-innhold__children'>{props.children}</Column>
            </Row>
            <Row>
              <Column className='notifikasjon__footer'>
                {props.type == NotifikasjonType.GravidSoknad && <GravidSoknadFooter />}
              </Column>
            </Row>
          </Panel>
        </Column>
      </Row>
    </div>
  );
};

export default NotifikasjonInnhold;
