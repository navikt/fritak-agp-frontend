import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@navikt/virksomhetsvelger/dist/assets/style.css';
import env, { EnvironmentType } from './config/environment';
import '@navikt/ds-css';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import nais from './nais.js';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

if (env.environmentMode !== EnvironmentType.LOCAL) {
  initializeFaro({
    url: nais.telemetryCollectorURL,
    app: nais.app,
    instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()]
  });
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
