import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@navikt/virksomhetsvelger/dist/assets/style.css';
import env, { EnvironmentType } from './config/environment';
import '@navikt/ds-css';
import isDev from './config/isDev';

async function bootApp() {
  // Initialize MSW for development
  if (isDev()) {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass'
      });
    } catch (error) {
      console.warn('MSW failed to start:', error);
      // Continue without MSW if it fails
    }
  }

  // Lazy load Faro telemetry for non-local environments
  if (env.environmentMode !== EnvironmentType.LOCAL) {
    Promise.all([import('@grafana/faro-web-sdk'), import('@grafana/faro-web-tracing'), import('./nais.js')])
      .then(([{ getWebInstrumentations, initializeFaro }, { TracingInstrumentation }, { default: nais }]) => {
        initializeFaro({
          url: nais.telemetryCollectorURL,
          app: nais.app,
          instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()]
        });
      })
      .catch((error) => {
        console.error('Failed to initialize Faro telemetry:', error);
      });
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);
}

bootApp().catch((error) => {
  console.error('Failed to boot app:', error);
});
