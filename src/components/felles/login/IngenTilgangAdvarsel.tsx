import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import Oversettelse from '../Oversettelse/Oversettelse';
import { IngenTilgangAdvarselKeys } from './IngenTilgangAdvarselKeys';

export const IngenTilgangAdvarsel = () => {
  return (
    <AlertStripeAdvarsel>
      <Oversettelse langKey={IngenTilgangAdvarselKeys.INGEN_TILGANG_ADVARSEL} />
    </AlertStripeAdvarsel>
  );
};

export default IngenTilgangAdvarsel;
