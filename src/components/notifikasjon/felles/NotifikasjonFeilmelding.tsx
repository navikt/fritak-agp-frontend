import React from 'react';
import { Alert } from '@navikt/ds-react';

const NotifikasjonFeilmelding = () => (
  <Alert variant='error' className='notifikasjon__feilmelding'>
    Det oppstod en feil
  </Alert>
);

export default NotifikasjonFeilmelding;
