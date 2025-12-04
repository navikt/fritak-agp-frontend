import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@navikt/virksomhetsvelger/dist/assets/style.css';
import env, { EnvironmentType } from './config/environment';
import '@navikt/ds-css';

// Lazy load Faro telemetry for non-local environments
if (env.environmentMode !== EnvironmentType.LOCAL) {
  Promise.all([import('@grafana/faro-web-sdk'), import('@grafana/faro-web-tracing'), import('./nais.js')]).then(
    ([{ getWebInstrumentations, initializeFaro }, { TracingInstrumentation }, { default: nais }]) => {
      initializeFaro({
        url: nais.telemetryCollectorURL,
        app: nais.app,
        instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()]
      });
    }
  );
}

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
