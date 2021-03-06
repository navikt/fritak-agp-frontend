import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import env from './config/environment';
import {
  LanguageProvider,
  ArbeidsgiverStatus,
  ArbeidsgiverProvider,
  LoginProvider,
  LoginStatus
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from './locale/Locales';
import i18next from 'i18next';

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
  <Route path='/:language(nb|en)/*'>
    <LoginProvider baseUrl={basePath} status={loginStatus} loginServiceUrl={loginServiceUrl}>
      <ArbeidsgiverProvider baseUrl={basePath} status={arbeidsgiverStatus} arbeidsgivere={arbeidsgivere}>
        <ApplicationRoutes />
      </ArbeidsgiverProvider>
    </LoginProvider>
  </Route>
);

const App = () => (
  <BrowserRouter basename='fritak-agp'>
    <LanguageProvider languages={['nb', 'en']} i18n={i18next} bundle={Locales}>
      <Application />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
