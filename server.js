const express = require('express');
const app = express();
const path = require('path');

const BASE_PATH = '/fritak-agp';
const HOME_FOLDER = './build';
const PORT = 3000;

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

app.get(BASE_PATH + '/api/env', (req, res) => {
  res.status(200).send({
    'login-url': process.env.LOGIN_URL,
    'api-url': process.env.API_BACKEND_URL
  });
});

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
