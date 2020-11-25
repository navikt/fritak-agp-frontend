const express = require('express');
const app = express();

const BASE_PATH ='/fritak-agp';
const HOME = './build';
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.API_BACKEND_URL || 'http://localhost:3000/fritak-agp/'
const MOCK_MODE = true;

// eslint-disable-next-line no-console
console.log('Server: MOCK_MODE=', MOCK_MODE);
// eslint-disable-next-line no-console
console.log('Server: BACKEND_URL=', BACKEND_URL);

app.use(BASE_PATH, express.static(HOME))

app.get('/health/is-alive', (req, res) => {
    // eslint-disable-next-line no-console
    console.log('Server: is-alive');
    res.sendStatus(200);
})
app.get('/health/is-ready', (req, res) => {
    // eslint-disable-next-line no-console
    console.log('Server: is-ready');
    res.sendStatus(200);
})
app.get('/', (req, res) => {
    // eslint-disable-next-line no-console
    console.log('Server: redirect to default');
    res.redirect('/fritak-agp/');
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server: listening on port', PORT);
});
