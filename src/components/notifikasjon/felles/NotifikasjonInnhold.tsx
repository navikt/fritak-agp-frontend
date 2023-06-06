import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import NotifikasjonType from './NotifikasjonType';
import dayjs from 'dayjs';
import './NotifikasjonInnhold.sass';
import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';

interface NotifikasjonInnholdProps {
  children: any;
  title: string;
  dato?: string;
  type: NotifikasjonType;
}

const NotifikasjonInnhold = (props: NotifikasjonInnholdProps) => {
  return (
    <div className='notifikasjon-innhold'>
      <Row>
        <Column>
          <div className={'notifikasjon-innhold__path'}>
            <Link href='/min-side-arbeidsgiver/'>Ditt NAV / </Link>
            <Link href=''>Beskjeder / </Link>
            <Link href=''>Din arbeidsgiver har søkt om utvidet støtte</Link>
          </div>
        </Column>
      </Row>
      <Row>
        <Column>
          <Panel className='notifikasjon-innhold__hvit'>
            <Row>
              <Column>
                <Heading size='large' level='2'>
                  {props.title}
                </Heading>
                <BodyLong>{dayjs(props.dato).format('DD.MM.YYYY')}</BodyLong>
              </Column>
            </Row>

            <Row>
              <Column className='notifikasjon-innhold__children'>{props.children}</Column>
            </Row>
          </Panel>
        </Column>
      </Row>
    </div>
  );
};

export default NotifikasjonInnhold;
