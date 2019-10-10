const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const path = require('path');

const { Client } = require('pg');

const pgclient = new Client({
    user: 'ben',
    host: 'localhost',
    database: 'tempmon',
    password: '',
    port: 5432,
});
pgclient.connect();

const port = 5000;

console.log(__dirname);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/data', (req, res) => {
    pgclient.query('SELECT * FROM data', (err, dbres) => {
        console.log(err ? err.stack : dbres.rows[0]) // Hello World!
        res.send(dbres.rows);
    });
});

app.post('/data', (req, res) => {
    // add data to postgres
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' });
    socket.on('another-event', (data) => { console.log(data) });
});

server.listen(port, '0.0.0.0', () => console.log(`Example app listening on ${port}!`))
