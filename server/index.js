const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const MOCK_ARBEIDSGIVERE = require('./arbeidsgivere.json');

const BASE_PATH ='/fritak-agp';
const HOME = './build';
const PORT = process.env.PORT || 9000;
const BACKEND_URL = process.env.API_GATEWAY || 'http://localhost:8080/fritakagp'
const MOCK_MODE = !!process.env.MOCK;

console.log('Server: MOCK_MODE=', MOCK_MODE);
console.log('Server: BACKEND_URL=', BACKEND_URL);

app.use(BASE_PATH, express.static(HOME))

app.get('/health/is-alive', (req, res) => res.sendStatus(200));
app.get('/health/is-ready', (req, res) => res.sendStatus(200));

if (MOCK_MODE) {
    app.get( '/fritak-agp/api/v1/arbeidsgivere', (req, res) => res.json(MOCK_ARBEIDSGIVERE));
} else {
    app.use('/api', proxy({
            changeOrigin: true,
            target: BACKEND_URL,
            secure: true,
            xfwd: true,
            headers: {
                'x-nav-apiKey': process.env.APIGW_HEADER,
            }
        })
    );
}

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server: listening on port', PORT);
});
