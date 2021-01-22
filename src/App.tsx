import React from 'react';
import { EnvironmentProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { Route, Switch } from 'react-router-dom';
import GravidSide from './components/gravid/GravidSide';
import Forside from './components/Forside';
import GravidKvittering from './components/gravid/GravidKvittering';
import env from './environment';
import lenker from './components/lenker';
import Side from './components/Side';
import KroniskSide from './components/kronisk/KroniskSide';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidKrav from './components/gravidkrav/GravidKrav';
import injectRedirectPath from './utils/injectRedirectPath';
import loginExpiryAPI from './api/loginExpiryAPI';

const App = () => {
  loginExpiryAPI().then((loggedInStatus) => {
    if (loggedInStatus.status === 401 && (!location.search || !location.search.includes('loggedIn=true'))) {
      const redirectedLoginServiceUrl = injectRedirectPath(location.pathname, '/fritak-agp');
      window.location.href = redirectedLoginServiceUrl;
      return <div />;
    }
  });

  return (
    <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Søknadsskjema'} basePath={env.baseUrl}>
      <Side>
        <Switch>
          <Route path={lenker.GravidKvittering} render={() => <GravidKvittering />} />
          <Route path={lenker.GravidKrav} render={() => <GravidKrav />} />
          <Route path={lenker.KroniskKvittering} render={() => <KroniskKvittering />} />
          <Route path={lenker.Gravid} render={() => <GravidSide />} />
          <Route path={lenker.Kronisk} render={() => <KroniskSide />} />
          <Route path={lenker.TokenFornyet} render={() => <TokenFornyet />} />
          <Route path={lenker.Home} render={() => <Forside />} />
        </Switch>
      </Side>
    </EnvironmentProvider>
  );
};

export default App;
