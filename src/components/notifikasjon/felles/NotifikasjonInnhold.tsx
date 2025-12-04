import React, { PropsWithChildren } from 'react';
import NotifikasjonType from './NotifikasjonType';
import { format, parseISO } from 'date-fns';
import './NotifikasjonInnhold.sass';
import { BodyLong, Box, Heading, Link } from '@navikt/ds-react';
import environment from '../../../config/environment';

interface NotifikasjonInnholdProps {
  title: string;
  dato?: string;
  type: NotifikasjonType;
}

const NotifikasjonInnhold = (props: PropsWithChildren<NotifikasjonInnholdProps>) => {
  return (
    <div className='notifikasjon-innhold'>
      <div>
        <div>
          <div className={'notifikasjon-innhold__path'}>
            <Link href={environment.minSideArbeidsgiver}>Ditt NAV / </Link>
            <Link href=''>Beskjeder / </Link>
            <Link href=''>Din arbeidsgiver har søkt om utvidet støtte</Link>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Box padding='4' borderRadius='small' className='notifikasjon-innhold__hvit'>
            <div>
              <div>
                <Heading size='large' level='2'>
                  {props.title}
                </Heading>
                <BodyLong>{props.dato ? format(parseISO(props.dato), 'dd.MM.yyyy') : ''}</BodyLong>
              </div>
            </div>

            <div>
              <div className='notifikasjon-innhold__children'>{props.children}</div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default NotifikasjonInnhold;
