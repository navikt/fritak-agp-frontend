const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const MOCK_ARBEIDSGIVERE = require('./json/arbeidsgivere.json');
const MOCK_FEILMELDING_GRAVID = require('./json/feilmelding-gravid.json');

const BASE_PATH = '/fritak-agp';
const HOME = 'build';
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.API_GATEWAY || 'http://localhost:8080/api';
const MOCK_MODE = !!process.env.MOCK;

app.get('/internal/isAlive', (req, res) => res.sendStatus(200));
app.get('/internal/isReady', (req, res) => res.sendStatus(200));

if (MOCK_MODE) {
  app.post(
    BASE_PATH + '/api/v1/gravid/soeknad',
    proxy({
      changeOrigin: true,
      target: BACKEND_URL + '/v1/gravid/soeknad',
      logLevel: 'debug',
      ignorePath: true
    })
  );

  app.get(
    BASE_PATH + '/api/v1/sw',
    proxy({
      changeOrigin: true,
      target: 'https://swapi.dev/api/people/1',
      logLevel: 'debug',
      ignorePath: true
    })
  );

  //   app.post(BASE_PATH + '/api/v1/gravid/soeknad', (req, res) => res.json(MOCK_FEILMELDING_GRAVID));
  app.get(BASE_PATH + '/api/v1/arbeidsgivere', (req, res) =>
    res.json(MOCK_ARBEIDSGIVERE)
  );
} else {
  app.use(BASE_PATH, express.static(HOME));
  app.use(
    '/api/v1/gravid/soeknad',
    proxy({
      changeOrigin: true,
      target: BACKEND_URL,
      secure: true,
      xfwd: true,
      headers: {
        'x-nav-apiKey': process.env.APIGW_HEADER
      }
    })
  );
}

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
