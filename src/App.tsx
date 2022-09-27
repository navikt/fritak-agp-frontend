import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApplicationRoutes } from './ApplicationRoutes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import environment from './config/environment';
import {
  LanguageProvider,
  ArbeidsgiverStatus,
  ArbeidsgiverProvider,
  LoginStatus
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import Locales from './locale/Locales';
import i18next from 'i18next';
import lenker from './config/lenker';
import Forside from './components/Forside';

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
      <Route path='/:language(nb|en)/*' element={<ApplicationRoutes />}></Route>
      <Route path={lenker.Home} element={<Forside />} />
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
