import { Route, Switch } from 'react-router-dom';
import lenker from './config/lenker';
import GravidSide from './components/gravid/GravidSide';
import GravidKvittering from './components/gravid/GravidKvittering';
import KroniskSide from './components/kronisk/KroniskSide';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidKrav from './components/gravidkrav/GravidKrav';
import KroniskKrav from './components/kroniskkrav/KroniskKrav';
import KravKvittering from './components/kravkvittering/KravKvittering';
import Forside from './components/Forside';
import React from 'react';
import { GravidSoknadController } from './components/notifikasjon/gravid/soknad/GravidSoknadController';
import { GravidKravController } from './components/notifikasjon/gravid/krav/GravidKravController';
import { KroniskSoknadController } from './components/notifikasjon/kronisk/soknad/KroniskSoknadController';
import { KroniskKravController } from './components/notifikasjon/kronisk/krav/KroniskKravController';
import { TokenFornyet } from '@navikt/helse-arbeidsgiver-felles-frontend';
import GravidSoknadKvitteringProvider from './context/GravidSoknadKvitteringContext';

export const ApplicationRoutes = () => (
  <div className='application-routes'>
    <GravidSoknadKvitteringProvider>
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
        <Route path={lenker.NotifikasjonGravidSoknad} render={() => <GravidSoknadController />} />
        <Route path={lenker.NotifikasjonGravidKrav} render={() => <GravidKravController />} />
        <Route path={lenker.NotifikasjonKroniskSoknad} render={() => <KroniskSoknadController />} />
        <Route path={lenker.NotifikasjonKroniskKrav} render={() => <KroniskKravController />} />
        <Route path={lenker.Home} render={() => <Forside />} />
      </Switch>
    </GravidSoknadKvitteringProvider>
  </div>
);
