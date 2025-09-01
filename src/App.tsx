import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import environment from './config/environment';
import Locales from './locale/Locales';
import i18next from 'i18next';
import { ArbeidsgiverProvider } from './context/arbeidsgiver/ArbeidsgiverContext';
import { LanguageProvider } from './context/language/LanguageContext';
import { LoginStatus } from './context/login/LoginStatus';
import HttpStatus from './api/HttpStatus';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface ApplicationProps {
  loginStatus?: LoginStatus;
  arbeidsgiverStatus?: HttpStatus;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
  loginServiceUrl?: string;
}

export const Application = ({
  arbeidsgiverStatus = HttpStatus.NotStarted,
  arbeidsgivere,
  basePath = environment.baseUrl
}: ApplicationProps) => (
  <HelmetProvider>
    <ArbeidsgiverProvider baseUrl={basePath} status={arbeidsgiverStatus} arbeidsgivere={arbeidsgivere}>
      <Helmet>
        <script
          defer
          src='https://cdn.nav.no/team-researchops/sporing/sporing.js'
          data-host-url='https://umami.nav.no'
          data-website-id={environment.umamiWebsiteId}
          data-domains={environment.umamiDataDomains}
        ></script>
      </Helmet>
      <Routes>
        <Route path=':language'>
          <Route path='*' element={<ApplicationRoutes />} />
        </Route>
      </Routes>
    </ArbeidsgiverProvider>
  </HelmetProvider>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <LanguageProvider languages={['nb', 'en']} i18n={i18next} bundle={Locales}>
      <Application />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
