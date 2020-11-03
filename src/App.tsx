import React from 'react';
import { ArbeidsgiverProvider, EnvironmentProvider, InnloggetSide } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { Route, Switch } from 'react-router-dom';
import GravidSide from './components/gravid/GravidSide';
import KroniskSide from './components/KroniskSide';
import Forside from './components/Forside';
import GravidKvittering from './components/gravid/GravidKvittering';
import env from './environment';
import lenker from './components/lenker';
import './App.sass';



const App = () => {
  return (
    <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Søknadsskjema'}
                         basePath={env.baseUrl}>
      <ArbeidsgiverProvider>
        <I18nextProvider i18n={i18n}>
          <InnloggetSide className="innloggetside__fritak">
            <Switch>
              <Route path={lenker.Gravid} render={() => <GravidSide/>}/>
              <Route path={lenker.Kronisk} render={() => <KroniskSide/>}/>
              <Route path={lenker.GravidKvittering} render={() => <GravidKvittering/>}/>
              <Route path={lenker.Home} render={() => <Forside/>}/>
            </Switch>
          </InnloggetSide>
        </I18nextProvider>
      </ArbeidsgiverProvider>
    </EnvironmentProvider>
  );
};

export default App;
