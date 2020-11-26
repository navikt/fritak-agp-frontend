import React from 'react';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GravidSide from './components/gravid/GravidSide';
import KroniskSide from './components/KroniskSide';
import Forside from './components/Forside';
import GravidKvittering from './components/gravid/GravidKvittering';
import env from './environment';
import lenker from './components/lenker';
import Side from './components/Side';

const App = () => {
  return (
    <EnvironmentProvider
      loginServiceUrl={env.loginServiceUrl}
      sideTittel={'Søknadsskjema'}
      basePath={env.baseUrl}
    >
      <BrowserRouter basename='fritak-agp'>
        <I18nextProvider i18n={i18n}>
          <Side>
            <Switch>
              <Route path={lenker.Gravid} render={() => <GravidSide />} />
              <Route path={lenker.Kronisk} render={() => <KroniskSide />} />
              <Route
                path={lenker.GravidKvittering}
                render={() => <GravidKvittering />}
              />
              <Route path={lenker.Home} render={() => <Forside />} />
            </Switch>
          </Side>
        </I18nextProvider>
      </BrowserRouter>
    </EnvironmentProvider>
  );
};

export default App;
