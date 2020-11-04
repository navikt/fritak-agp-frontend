import React from 'react';
import { ArbeidsgiverProvider, EnvironmentProvider, InnloggetSide } from '@navikt/helse-arbeidsgiver-felles-frontend';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GravidSide from './components/gravid/GravidSide';
import KroniskSide from './components/KroniskSide';
import Forside from './components/Forside';
import env from './environment';
import './App.sass';


const App = () => {
  return (
    <EnvironmentProvider loginServiceUrl={env.loginServiceUrl} sideTittel={'Søknadsskjema'}
                         basePath={env.baseUrl}>
      <BrowserRouter basename="fritak-agp">
        <ArbeidsgiverProvider>
          <I18nextProvider i18n={i18n}>
            <InnloggetSide className="innloggetside__fritak">
              <Switch>
                <Route path="/gravid" render={() => <GravidSide/>}/>
                <Route path="/kronisk" render={() => <KroniskSide/>}/>
                <Route path="/" render={() => <Forside/>}/>
              </Switch>
            </InnloggetSide>
          </I18nextProvider>
        </ArbeidsgiverProvider>
      </BrowserRouter>
    </EnvironmentProvider>
  );
};

export default App;
