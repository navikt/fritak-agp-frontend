import React from 'react';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { BrowserRouter } from 'react-router-dom';
import env from './environment';
import { LoginProvider } from './context/LoginContext';
import { ApplicationRoutes } from './ApplicationRoutes';

interface ApplicationProps {
  path?: string;
  loginStatus?: number;
  loggedIn?: boolean;
  loginExpiry?: number;
}

export const Application = (props: ApplicationProps) => {
  return (
    <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Søknadsskjema'} basePath={env.basePath}>
      <LoginProvider loggedIn={props.loggedIn}>
        <ApplicationRoutes />
      </LoginProvider>
    </EnvironmentProvider>
  );
};

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <Application />
  </BrowserRouter>
);

export default App;
