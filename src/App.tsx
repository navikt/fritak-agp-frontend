import React from 'react';
import {
  EnvironmentProvider,
  LoginProvider
} from '@navikt/helse-arbeidsgiver-felles-frontend';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GravidSide from './components/gravid/GravidSide';
import Forside from './components/Forside';
import GravidKvittering from './components/gravid/GravidKvittering';
import env from './environment';
import lenker from './components/lenker';
import Side from './components/Side';
import KroniskSide from './components/kronisk/KroniskSide';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';

const App = () => {
  return (
    <EnvironmentProvider
      loginServiceUrl={env.loginServiceUrl}
      sideTittel={'Søknadsskjema'}
      basePath={env.baseUrl}
    >
      <BrowserRouter basename='fritak-agp'>
        <LoginProvider loginServiceUrl={env.loginServiceUrl}>
          <Side>
            <Switch>
              <Route path={lenker.Gravid} render={() => <GravidSide />} />
              <Route path={lenker.Kronisk} render={() => <KroniskSide />} />
              <Route
                path={lenker.GravidKvittering}
                render={() => <GravidKvittering />}
              />
              <Route
                path={lenker.KroniskKvittering}
                render={() => <KroniskKvittering />}
              />
              <Route path={lenker.Home} render={() => <Forside />} />
              <Route
                path={lenker.TokenFornyet}
                render={() => <TokenFornyet />}
              />
            </Switch>
          </Side>
        </LoginProvider>
      </BrowserRouter>
    </EnvironmentProvider>
  );
};

export default App;
