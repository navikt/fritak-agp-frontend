import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/virksomhetsvelger';
import environment from './config/environment';
import Locales from './locale/Locales';
import i18next from 'i18next';
import { ArbeidsgiverProvider } from './context/arbeidsgiver/ArbeidsgiverContext';
import ArbeidsgiverStatus from './context/arbeidsgiver/ArbeidsgiverStatus';
import { LanguageProvider } from './context/language/LanguageContext';
import { LoginStatus } from './context/login/LoginStatus';

interface ApplicationProps {
  loginStatus?: LoginStatus;
  arbeidsgiverStatus?: ArbeidsgiverStatus;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
  loginServiceUrl?: string;
}

export const Application = ({
  arbeidsgiverStatus = ArbeidsgiverStatus.NotStarted,
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
  <BrowserRouter basename='fritak-agp' future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <LanguageProvider languages={['nb', 'en']} i18n={i18next} bundle={Locales}>
      <Application />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
