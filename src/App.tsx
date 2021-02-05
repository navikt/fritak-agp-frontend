import React from 'react';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { BrowserRouter } from 'react-router-dom';
import env from './environment';
import LoginExpiryProvider from './context/LoginExpiryContext';
import { LoginProvider, redirectUrl } from './context/LoginContext';
import { ApplicationRoutes } from './ApplicationRoutes';

interface ApplicationProps {
  path?: string;
  loginStatus?: number;
  loggedIn?: boolean;
  loginExpiry?: number;
}

export const Application = (props: ApplicationProps) => {
  let href = window.location.href;
  href = href.replace('?loggedIn=true', '');

  const loginServiceUrl = redirectUrl(env.loginServiceUrl, href);

  return (
    <EnvironmentProvider loginServiceUrl={loginServiceUrl} sideTittel={'Søknadsskjema'} basePath={env.baseUrl}>
      <LoginProvider loggedIn={props.loggedIn}>
        <LoginExpiryProvider status={props.loginStatus} loginExpiry={props.loginExpiry}>
          <ApplicationRoutes />
        </LoginExpiryProvider>
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
