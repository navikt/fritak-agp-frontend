import React from 'react';
import { Container, Row } from 'nav-frontend-grid';

interface SideRammeProps {
  children: any;
}

const SideRamme = (props: SideRammeProps) => {
  return (
    <main className='side-ramme'>
      <Container>
        <Row>{props.children}</Row>
      </Container>
    </main>
  );
};

export default SideRamme;
