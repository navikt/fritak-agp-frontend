import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { ArbeidsgiverProvider } from './context/ArbeidsgiverContext';
import env from './environment';
import { Status } from './api/ArbeidsgiverAPI';

interface ApplicationProps {
  loginStatus?: Status;
  loggedIn?: boolean;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
}

export const Application = ({ loggedIn, loginStatus, arbeidsgivere, basePath = env.baseUrl }: ApplicationProps) => (
  <LoginProvider loggedIn={loggedIn} baseUrl={basePath}>
    <ArbeidsgiverProvider basePath={basePath} status={loginStatus} arbeidsgivere={arbeidsgivere}>
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
