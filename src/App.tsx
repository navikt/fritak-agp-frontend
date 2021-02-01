import React from 'react';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { BrowserRouter } from 'react-router-dom';
import env from './environment';
import Side from './components/Side';
import LoginExpiryProvider from './context/LoginExpiryContext';
import { LoginProvider } from './context/LoginContext';
import { ApplicationRoutes } from './ApplicationRoutes';

interface ApplicationProps {
  path?: string;
  loginStatus?: number;
  loggedIn?: boolean;
  loginExpiry?: number;
}

export const Application = (props: ApplicationProps) => (
  <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Søknadsskjema'} basePath={env.baseUrl}>
    <LoginProvider loggedIn={props.loggedIn}>
      <LoginExpiryProvider status={props.loginStatus} loginExpiry={props.loginExpiry}>
        <Side>
          <ApplicationRoutes />
        </Side>
      </LoginExpiryProvider>
    </LoginProvider>
  </EnvironmentProvider>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <Application />
  </BrowserRouter>
);

export default App;
