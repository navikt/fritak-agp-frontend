import express from 'express';
import path from 'path';
import proxy from 'express-http-proxy';
import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

const app = express();

const BASE_PATH = '/fritak-agp';
const HOME_FOLDER = '../dist';
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_BASEPATH = process.env.API_BASEPATH || '';
const AUDIENCE = process.env.AUDIENCE || '';

const startServer = () => {
  app.get('/health/is-alive', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/health/is-ready', (req, res) => {
    res.sendStatus(200);
  });

  app.use(BASE_PATH + '/api/*', (req, res) => {
    const token = getToken(req);
    if (!token) {
      /* håndter manglende token */
      console.error('Mangler token i header');
      return res.status(401);
    }

    validateToken(token).then((validation) => {
      if (!validation.ok) {
        console.log('Validering feilet: ', validation.error);
        return res.status(401);
      }

      requestOboToken(token, AUDIENCE).then((obo) => {
        if (!obo.ok) {
          /* håndter obo-feil */
          console.error('OBO-feil: ', obo.error);
          return res.status(401);
        }

        return proxy(API_URL, {
          parseReqBody: false,
          limit: '50mb',
          proxyReqPathResolver: (req) => req.originalUrl.replace(BASE_PATH, API_BASEPATH),
          proxyReqOptDecorator: (proxyReqOpts) => {
            proxyReqOpts.headers['cookie'] = '';
            proxyReqOpts.headers['Authorization'] = `Bearer ${obo.token}`;
            return proxyReqOpts;
          },
          proxyErrorHandler: (err, res, next) => {
            console.log(`Error in proxy for ${req.host} ${err.message}, ${err.code}`);
            if (err && err.code === 'ECONNREFUSED') {
              console.log('proxyErrorHandler: Got ECONNREFUSED');
              return res.status(503).send({ message: `Could not contact ${req.host}` });
            }
            next(err);
          }
        });
      });
    });
  });

  app.use(BASE_PATH, express.static(HOME_FOLDER));

  app.use('/*', (req, res, next) => {
    if (!req.headers['authorization']) {
      res.redirect(`${BASE_PATH}/oauth2/login?redirect=${req.originalUrl}`);
    } else {
      next();
    }
  });

  app.get('/', (req, res) => {
    res.redirect('/fritak-agp/');
  });

  app.use(express.json({ limit: '50mb' }));

  app.get('/*', function (req, res) {
    injectDecoratorServerSide({
      env: 'prod',
      filePath: path.join(__dirname, HOME_FOLDER, 'index.html'),
      params: { context: 'arbeidsgiver' }
    }).then((html) => {
      res.send(html);
    });
  });

  app.use(function (req, res) {
    // eslint-disable-next-line no-console
    console.error('Server: Error 404', req.url);
    res.status(404).send('404 not found');
  });

  app.use(function (err, req, res) {
    // eslint-disable-next-line no-console
    console.error('Server: Error 500', err);
    res.status(500).send('500 Error');
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server: listening on port', PORT);
  });
};

startServer();
