import { Route, Switch } from 'react-router-dom';
import lenker from './components/lenker';
import GravidSide from './components/gravid/GravidSide';
import GravidKvittering from './components/gravid/GravidKvittering';
import KroniskSide from './components/kronisk/KroniskSide';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidKrav from './components/gravidkrav/GravidKrav';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import Forside from './components/Forside';
import React from 'react';
import { ArbeidsgiverProvider } from '@navikt/helse-arbeidsgiver-felles-frontend';

export const ApplicationRoutes = () => (
  <Switch>
    <Route path={lenker.Gravid} exact={true} render={() => <GravidSide />} />
    <Route path={lenker.GravidKvittering} exact={true} render={() => <GravidKvittering />} />
    <Route path={lenker.Kronisk} exact={true} render={() => <KroniskSide />} />
    <Route path={lenker.KroniskKvittering} render={() => <KroniskKvittering />} />
    <Route path={lenker.GravidKravKvittering} exact={true} render={() => <GravidKvittering />} />
    <Route
      path={lenker.GravidKrav}
      exact={true}
      render={() => (
        <ArbeidsgiverProvider>
          <GravidKrav />
        </ArbeidsgiverProvider>
      )}
    />
    <Route path={lenker.TokenFornyet} render={() => <TokenFornyet />} />
    <Route path={lenker.Home} render={() => <Forside />} />
  </Switch>
);
