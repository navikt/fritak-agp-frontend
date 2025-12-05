import { Button } from '@navikt/ds-react';
import React from 'react';

const PrintKnapp = () => {
  const skrivUt = () => window.print();

  return (
    <Button onClick={() => skrivUt()} className='skjul-fra-print'>
      Skriv ut kvittering
    </Button>
  );
};

export default PrintKnapp;
