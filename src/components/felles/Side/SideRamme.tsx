import React from 'react';
// import { Container, Row } from 'nav-frontend-grid';

interface SideRammeProps {
  children: any;
}

const SideRamme = (props: SideRammeProps) => {
  return (
    <main className='side-ramme'>
      <div>
        <div>{props.children}</div>
      </div>
    </main>
  );
};

export default SideRamme;
