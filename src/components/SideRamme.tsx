import React from 'react';
import { Container, Row } from 'nav-frontend-grid';
import './SideRamme.sass';

interface SideRamme {
  children: any;
}

const SideRamme = (props: SideRamme) => {
  return (
    <main className='side-ramme'>
      <Container>
        <Row>{props.children}</Row>
      </Container>
    </main>
  );
};

export default SideRamme;
