const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.use(express.static('public'));

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on ${port}!`))
