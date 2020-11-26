const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require('path');

const BASE_PATH = '/fritak-agp';
const HOME = './build';
const PORT = process.env.PORT || 3000;
const BACKEND_URL =
  process.env.API_BACKEND_URL || 'http://localhost:3001/fritak-agp/';
const MOCK_MODE = process.env.MOCK === 'true';

// eslint-disable-next-line no-console
console.log('Server: MOCK_MODE=', MOCK_MODE);
// eslint-disable-next-line no-console
console.log('Server: BACKEND_URL=', BACKEND_URL);

app.use(BASE_PATH, express.static(HOME));

app.get('/health/is-alive', (req, res) => {
  res.sendStatus(200);
});
app.get('/health/is-ready', (req, res) => {
  res.sendStatus(200);
});
app.get('/', (req, res) => {
  // eslint-disable-next-line no-console
  res.redirect('/fritak-agp/');
});

if (MOCK_MODE) {
  const MOCK_ARBEIDSGIVERE = require('./arbeidsgivere.json');
  app.get('/fritak-agp/api/v1/arbeidsgivere', (req, res) =>
    res.json(MOCK_ARBEIDSGIVERE)
  );

  app.post(
    BASE_PATH + '/api/v1/gravid/soeknad',
    createProxyMiddleware({
      changeOrigin: true,
      target: BACKEND_URL + '/v1/gravid/soeknad',
      logLevel: 'debug',
      ignorePath: true
    })
  );
} else {
  app.use(BASE_PATH, express.static(HOME));
  app.use(
    '/api/v1/gravid/soeknad',
    createProxyMiddleware({
      changeOrigin: true,
      target: BACKEND_URL,
      secure: true,
      xfwd: true,
      headers: {
        'x-nav-apiKey': process.env.APIGW_HEADER
      }
    })
  );
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.use(function (req, res) {
  // eslint-disable-next-line no-console
  console.error('Server: Error 404', req.url);
  res.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res) {
  // eslint-disable-next-line no-console
  console.error('Server: Error 500', err);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server: listening on port', PORT);
});
