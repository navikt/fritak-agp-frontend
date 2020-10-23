import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import './index.css';
import Modal from 'react-modal';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

Modal.setAppElement('#root');

Sentry.init({ dsn: 'https://a61578f55fc64d8690aa9b66423ac0c4@sentry.gc.nav.no/46' });

ReactDOM.render(
  <BrowserRouter basename="nettrefusjon">
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
