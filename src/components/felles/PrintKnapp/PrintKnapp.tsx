import { Button } from '@navikt/ds-react';
import React from 'react';
import '@navikt/ds-css';

const PrintKnapp = () => {
  const skrivUt = () => window.print();

  return (
    <Button onClick={() => skrivUt()} className='skjul-fra-print'>
      Skriv ut kvittering
    </Button>
  );
};

export default PrintKnapp;
