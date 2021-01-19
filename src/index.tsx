import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import './index.css';
import Modal from 'react-modal';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import env, { EnvironmentType } from './environment';
import { version } from '../package.json';
import { BrowserRouter } from 'react-router-dom';

// @ts-ignore
document.querySelector('meta[name=buildNr]').setAttribute('content', version);

Modal.setAppElement('#root');

if (env.environmentMode !== EnvironmentType.LOCAL) {
  Sentry.init({
    dsn: 'https://a61578f55fc64d8690aa9b66423ac0c4@sentry.gc.nav.no/46',
    environment: EnvironmentType[env.environmentMode]
  });
}

ReactDOM.render(
  <BrowserRouter basename='fritak-agp'>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
