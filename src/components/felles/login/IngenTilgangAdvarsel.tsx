import React from 'react';
import Oversettelse from '../Oversettelse/Oversettelse';
import { IngenTilgangAdvarselKeys } from './IngenTilgangAdvarselKeys';
import { Alert } from '@navikt/ds-react';

export const IngenTilgangAdvarsel = () => {
  return (
    <Alert variant='warning'>
      <Oversettelse langKey={IngenTilgangAdvarselKeys.INGEN_TILGANG_ADVARSEL} />
    </Alert>
  );
};
