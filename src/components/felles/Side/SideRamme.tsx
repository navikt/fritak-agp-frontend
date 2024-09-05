import React, { PropsWithChildren } from 'react';

interface SideRammeProps {}

const SideRamme = (props: PropsWithChildren<SideRammeProps>) => {
  return (
    <main className='side-ramme'>
      <div>
        <div>{props.children}</div>
      </div>
    </main>
  );
};

export default SideRamme;
