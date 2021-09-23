import { Knapp } from 'nav-frontend-knapper';
import React from 'react';

const PrintKnapp = () => {
  const skrivUt = () => window.print();

  return (
    <Knapp onClick={() => skrivUt()} className='skjul-fra-print'>
      Skriv ut kvittering
    </Knapp>
  );
};

export default PrintKnapp;
