import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import './index.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Sentry.init({ dsn: 'https://3769b2c742c840f085ca72d93f49bb0e@sentry.gc.nav.no/39' });

ReactDOM.render(
  <BrowserRouter basename="nettrefusjon">
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
