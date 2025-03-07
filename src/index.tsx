import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import '@navikt/virksomhetsvelger/dist/assets/style.css';
import env, { EnvironmentType } from './config/environment';
import '@navikt/ds-css';

if (env.environmentMode !== EnvironmentType.LOCAL) {
  Sentry.init({
    dsn: 'https://a61578f55fc64d8690aa9b66423ac0c4@sentry.gc.nav.no/46',
    environment: EnvironmentType[env.environmentMode],
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.5
  });
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
