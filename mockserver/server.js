import express from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';

const app = express();
import cors from 'cors';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get('/fritak-agp/api/v1/arbeidsgiver-tilganger', function (req, res) {
  res.sendFile('arbeidsgiver-response.json', options);
});

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
  res.status(200).send('OK');
});

app.post('/fritak-agp/api/v1/gravid/soeknad', function (req, res) {
  res.status(200).send('OK');
});

app.post('/fritak-agp/api/v1/kronisk/soeknad', function (req, res) {
  res.status(200).send('OK');
});

app.listen(8080, () => {
  // eslint-disable-next-line no-console, no-undef
  console.log('Server: listening on port', 8080);
});
