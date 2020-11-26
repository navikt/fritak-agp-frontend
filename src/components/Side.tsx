import React from 'react';
import './Side.sass';
import { Container } from 'nav-frontend-grid';

interface SideProps {
  children: React.ReactNode;
  className?: string;
}

const Side = (props: SideProps) => {
  return (
    <main className='side'>
      <Container className={'side__innhold'}>{props.children}</Container>
    </main>
  );
};

export default Side;
