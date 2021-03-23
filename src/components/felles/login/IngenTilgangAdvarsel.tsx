import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Link } from 'react-router-dom';
import React from 'react';

export const IngenTilgangAdvarsel = () => (
  <AlertStripeAdvarsel>
    <p>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</p>
    <p>Tildeling av roller foregår i Altinn</p>
    <Link to='/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'>Les mer om roller og tilganger.</Link>
  </AlertStripeAdvarsel>
);
