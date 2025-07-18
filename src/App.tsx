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
  <ArbeidsgiverProvider baseUrl={basePath} status={arbeidsgiverStatus} arbeidsgivere={arbeidsgivere}>
    <Routes>
      <Route path=':language'>
        <Route path='*' element={<ApplicationRoutes />} />
      </Route>
    </Routes>
  </ArbeidsgiverProvider>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <LanguageProvider languages={['nb', 'en']} i18n={i18next} bundle={Locales}>
      <Application />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
