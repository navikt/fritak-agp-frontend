import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Oversettelse from '../Oversettelse/Oversettelse';
import LangKey from '../../../locale/LangKey';

export const IngenTilgangAdvarsel = () => {
  const { t } = useTranslation();

  return (
    <AlertStripeAdvarsel>
      <Oversettelse langKey={LangKey.INGEN_TILGANG_ADVARSEL_TEKST} />
      <Link to='/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'>{t(LangKey.INGEN_TILGANG_ADVARSEL_LENKE)}</Link>
    </AlertStripeAdvarsel>
  );
};
