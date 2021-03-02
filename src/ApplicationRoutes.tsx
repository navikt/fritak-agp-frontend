import { Route, Switch } from 'react-router-dom';
import lenker from './components/lenker';
import GravidSide from './components/gravid/GravidSide';
import GravidKvittering from './components/gravid/GravidKvittering';
import KroniskSide from './components/kronisk/KroniskSide';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidKrav from './components/gravidkrav/GravidKrav';
import KroniskKrav from './components/kroniskkrav/KroniskKrav';
import TokenFornyet from './components/tokenFornyet/TokenFornyet';
import KravKvittering from './components/kravkvittering/KravKvittering';
import Forside from './components/Forside';
import React from 'react';

export const ApplicationRoutes = () => (
  <div className='application-routes'>
    <Switch>
      <Route path={lenker.Gravid} exact={true} render={() => <GravidSide />} />
      <Route path={lenker.GravidKvittering} exact={true} render={() => <GravidKvittering />} />
      <Route path={lenker.Kronisk} exact={true} render={() => <KroniskSide />} />
      <Route path={lenker.KroniskKvittering} render={() => <KroniskKvittering />} />
      <Route path={lenker.GravidKravKvittering} exact={true} render={() => <KravKvittering />} />
      <Route path={lenker.GravidKrav} exact={true} render={() => <GravidKrav />} />
      <Route path={lenker.KroniskKravKvittering} exact={true} render={() => <KravKvittering />} />
      <Route path={lenker.KroniskKrav} exact={true} render={() => <KroniskKrav />} />
      <Route path={lenker.TokenFornyet} render={() => <TokenFornyet />} />
      <Route path={lenker.Home} render={() => <Forside />} />
    </Switch>
  </div>
);
