const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const options = {
  root: path.join(__dirname)
};

app.use(cors());

app.get('/fritak-agp/api/v1/arbeidsgivere', function (req, res) {
  res.sendFile('arbeidsgivere.json', options);
});

app.listen(8080);
