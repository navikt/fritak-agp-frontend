const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios').default;

const BASE_PATH = '/fritak-agp';
const HOME_FOLDER = '../build';
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'http://localhost:3000';

const startServer = () => {
  app.use(BASE_PATH, express.static(HOME_FOLDER));

  app.get('/health/is-alive', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/health/is-ready', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/', (req, res) => {
    res.redirect('/fritak-agp/');
  });

  async function apiProxy(req, res, next) {
    const apiPath = req.path.replace(BASE_PATH + '/api', '');
    const token = req.headers.authorization;
    const { data } = await axios.request({
      url: API_URL + apiPath,
      method: req.method,
      headers: {
        Authorization: token
      }
    });
    res.status(200).send(data);
  }

  app.get(BASE_PATH + '/api/*', apiProxy);
  app.post(BASE_PATH + '/api/*', apiProxy);
  app.delete(BASE_PATH + '/api/*', apiProxy);

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
