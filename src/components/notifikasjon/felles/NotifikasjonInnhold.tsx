import React from 'react';
// import { div, div } from 'nav-frontend-grid';
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
      <div>
        <div>
          <div className={'notifikasjon-innhold__path'}>
            <Link href='/min-side-arbeidsgiver/'>Ditt NAV / </Link>
            <Link href=''>Beskjeder / </Link>
            <Link href=''>Din arbeidsgiver har søkt om utvidet støtte</Link>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Panel className='notifikasjon-innhold__hvit'>
            <div>
              <div>
                <Heading size='large' level='2'>
                  {props.title}
                </Heading>
                <BodyLong>{dayjs(props.dato).format('DD.MM.YYYY')}</BodyLong>
              </div>
            </div>

            <div>
              <div className='notifikasjon-innhold__children'>{props.children}</div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default NotifikasjonInnhold;
