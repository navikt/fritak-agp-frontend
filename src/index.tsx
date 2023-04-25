import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import Modal from 'react-modal';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import 'nav-frontend-core/dist/main.css';
import 'nav-frontend-typografi-style/dist/main.css';
import 'nav-frontend-skjema-style/dist/main.css';
import 'nav-frontend-hjelpetekst-style/dist/main.css';
import 'nav-frontend-grid-style/dist/main.css';
import 'nav-frontend-chevron-style/dist/main.css';
import 'nav-frontend-lenker-style/dist/main.css';
import 'nav-frontend-paneler-style/dist/main.css';
import 'nav-frontend-veileder-style/dist/main.css';
import 'nav-frontend-veilederpanel-style/dist/main.css';
import 'nav-frontend-modal-style/dist/main.css';
import 'nav-frontend-popover-style/dist/main.css';
import 'nav-frontend-tabell-style/dist/main.css';
import 'nav-frontend-knapper-style/dist/main.css';
import '@navikt/helse-arbeidsgiver-felles-frontend/dist/library.css';
import env, { EnvironmentType } from './config/environment';
import './components/felles/Upload/Upload.sass';
import { Integrations } from '@sentry/tracing';
import '@navikt/ds-css';

if (env.environmentMode !== EnvironmentType.LOCAL) {
  Sentry.init({
    dsn: 'https://a61578f55fc64d8690aa9b66423ac0c4@sentry.gc.nav.no/46',
    environment: EnvironmentType[env.environmentMode],
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5
  });
}

Modal.setAppElement('#root');

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
