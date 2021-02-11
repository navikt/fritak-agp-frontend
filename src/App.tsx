import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider, LoginStatus } from './context/LoginContext';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { ArbeidsgiverProvider, ArbeidsgiverStatus } from './context/ArbeidsgiverContext';
import env from './environment';

interface ApplicationProps {
  loginStatus?: LoginStatus;
  arbeidsgiverStatus?: ArbeidsgiverStatus;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
  loginServiceUrl?: string;
}

export const Application = ({
  loginStatus = LoginStatus.Checking,
  arbeidsgiverStatus = ArbeidsgiverStatus.NotStarted,
  arbeidsgivere,
  basePath = env.baseUrl,
  loginServiceUrl = env.loginServiceUrl
}: ApplicationProps) => (
  <LoginProvider baseUrl={basePath} status={loginStatus} loginServiceUrl={loginServiceUrl}>
    <ArbeidsgiverProvider baseUrl={basePath} status={arbeidsgiverStatus} arbeidsgivere={arbeidsgivere}>
      <ApplicationRoutes />
    </ArbeidsgiverProvider>
  </LoginProvider>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <Application />
  </BrowserRouter>
);

export default App;
