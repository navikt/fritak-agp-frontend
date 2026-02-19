import express from 'express';
import path from 'path';
import process from 'node:process';
import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { buildCspHeader, injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

const app = express();

app.use(express.json({ limit: '50mb' }));

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_PATH = '/fritak-agp';
const HOME_FOLDER = '../dist';

const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_BASEPATH = process.env.API_BASEPATH || '';
const AUDIENCE = process.env.AUDIENCE || '';

const cspDirectives = {
  'default-src': [
    'https://telemetry.prod-gcp.nav.cloud.nais.io/collect',
    'https://telemetry.dev-gcp.nav.cloud.nais.io/collect'
  ],
  'connect-src': ['https://sr-client-cfg.amplitude.com/config']
};

const csp = await buildCspHeader(cspDirectives, { env: 'prod' });

async function safelyParseJSON(possibleJsonData) {
  let parsed;

  try {
    parsed = await possibleJsonData.json();
  } catch (e) {
    // eslint-disable-next-line no-undef
    console.log('Failed to parse JSON', e);
    parsed = {};
  }

  return parsed;
}

const startServer = () => {
  app.get('/health/is-alive', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/health/is-ready', (req, res) => {
    res.sendStatus(200);
  });

  app.use(BASE_PATH + '/api/{*splat}', async (req, res) => {
    try {
      const token = getToken(req);
      if (!token) {
        /* håndter manglende token */
        // eslint-disable-next-line no-undef
        console.error('Mangler token i header');
        res.status(401);
        res.send('Mangler token i header');
        return;
      }

      const validation = await validateToken(token);
      if (!validation.ok) {
        // eslint-disable-next-line no-undef
        console.log('Validering feilet: ', validation.error);
        res.status(401);
        res.send('Validering feilet');
        return;
      }

      const obo = await requestOboToken(token, AUDIENCE);
      if (!obo.ok) {
        /* håndter obo-feil */
        // eslint-disable-next-line no-undef
        console.error('OBO-feil: ', obo.error);
        res.status(401);
        res.send('OBO-feil');
        return;
      }

      // eslint-disable-next-line no-undef
      const data = await fetch(`${API_URL}${req.originalUrl.replace(BASE_PATH, API_BASEPATH)}`, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${obo.token}`
        },
        body: req.method === 'GET' || req.method === 'DELETE' ? undefined : JSON.stringify(req.body)
      });

      const json = req.method === 'DELETE' ? undefined : await safelyParseJSON(data);

      res.status(data.status);
      res.send(json);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Server: API proxy error', error);
      res.status(500).send('500 Error');
    }
  });

  app.use(BASE_PATH, express.static(HOME_FOLDER));

  app.use('/{*splat}', (req, res, next) => {
    if (!req.headers['authorization']) {
      res.redirect(`${BASE_PATH}/oauth2/login?redirect=${encodeURIComponent(req.originalUrl)}`);
    } else {
      next();
    }
  });

  app.get('/', (req, res) => {
    res.redirect('/fritak-agp/');
  });

  app.get('/{*splat}', function (req, res) {
    injectDecoratorServerSide({
      env: 'prod',
      filePath: path.join(__dirname, HOME_FOLDER, 'index.html'),
      params: { context: 'arbeidsgiver' }
    })
      .then((html) => {
        res.setHeader('Content-Security-Policy', csp);
        res.send(html);
      })
      .catch((error) => {
        // eslint-disable-next-line no-undef
        console.error('Server: SSR error', error);
        res.status(500).send('500 Error');
      });
  });

  app.use(function (req, res) {
    // eslint-disable-next-line no-undef
    console.error('Server: Error 404', req.url);
    res.status(404).send('404 not found');
  });

  app.use(function (err, req, res) {
    // eslint-disable-next-line no-undef
    console.error('Server: Error 500', err);
    res.status(500).send('500 Error');
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-undef
    console.log('Server: listening on port', PORT);
  });
};

startServer();
