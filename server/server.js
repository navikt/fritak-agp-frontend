const express = require('express');
const app = express();
const path = require('path');
const proxy = require('express-http-proxy');

const BASE_PATH = '/fritak-agp';
const HOME_FOLDER = '../build';
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'http://localhost:3000';

const startServer = () => {
  app.get('/health/is-alive', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/health/is-ready', (req, res) => {
    res.sendStatus(200);
  });

  app.use(
    BASE_PATH + '/api/*',
    proxy(API_URL, {
      proxyReqPathResolver: (req) => req.originalUrl.replace(BASE_PATH, ''),
      proxyErrorHandler: (err, res, next) => {
        console.log(`Error in proxy for ${host} ${err.message}, ${err.code}`);
        if (err && err.code === 'ECONNREFUSED') {
          console.log('proxyErrorHandler: Got ECONNREFUSED');
          return res.status(503).send({ message: `Could not contact ${host}` });
        }
        next(err);
      }
    })
  );

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

  app.use(express.json());

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, HOME_FOLDER, 'index.html'));
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
