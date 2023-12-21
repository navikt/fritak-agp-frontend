const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const cors = require('cors');

const options = {
  root: path.join(__dirname)
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(cors());

app.get('/fritak-agp/api/v1/arbeidsgivere', function (req, res) {
  res.sendFile('arbeidsgivere.json', options);
});

app.post('/fritak-agp/api/v1/gravid/krav', function (req, res) {
  res.status(409).send('Unauthorized');
});

app.get('/fritak-agp/api/v1/gravid/krav/:id', function (req, res) {
  res.sendFile('notifikasjon-gravid-krav.json', options);
});

app.post('/fritak-agp/api/v1/kronisk/krav', function (req, res) {
  res.status(200).send('Unauthorized');
});

app.post('/fritak-agp/api/v1/gravid/soeknad', function (req, res) {
  res.status(200).send('Unauthorized');
});

app.post('/fritak-agp/api/v1/kronisk/soeknad', function (req, res) {
  res.status(200).send('Unauthorized');
});

app.listen(8080);
