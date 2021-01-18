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
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import injectRedirectPath from './utils/injectRedirectPath';
import loginExpiryAPI from './api/loginExpiryAPI';

const App = () => {
  // const location = useLocation();
  loginExpiryAPI().then((loggedInStatus) => {
    console.log(loggedInStatus);
    if (loggedInStatus.status !== 200) {
      const redirectedLoginServiceUrl = injectRedirectPath(
        location.pathname,
        '/fritak-agp'
      );
      window.location.href = redirectedLoginServiceUrl;
      return <div className='login-context-redirect' />;
    }
    console.log(location.pathname);
  });

  return (
    <EnvironmentProvider
      loginServiceUrl={env.loginServiceUrl}
      sideTittel={'Søknadsskjema'}
      basePath={env.baseUrl}
    >
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
          <Route path={lenker.TokenFornyet} render={() => <TokenFornyet />} />
          <Route path={lenker.Home} render={() => <Forside />} />
        </Switch>
      </Side>
    </EnvironmentProvider>
  );
};

export default App;
