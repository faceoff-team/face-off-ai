const express = require('express');

const https = require('https');

const app = express();
const PORT = process.env.PORT || 8080;

const mysql = require('mysql2');

const path = require(`path`);

var connection = mysql.createConnection({
    host     : 'faceoff-db',
    user     : 'faceoff',
    password : 'FaceoffAIRocks',
    database : 'faceoff'
});

global.connection = connection;

app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route all api calls to api functions.
app.use('/api', require('./api/api'));

const REACT = path.join(__dirname, `react`);

app.use(express.static(REACT));

app.get('*', (req, res) => {
    res.sendFile(path.join(REACT, "index.html"));
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }

    //For debugging. All errors end up here.
    console.log(err);

    res.status(err.status).json({
        success: false,
        msg: err.message,
    });
});

let privateKey = fs.readFileSync(path.join(__dirname, './https/priv.pem'), `utf8`);
let certificate = fs.readFileSync(path.join(__dirname, './https/cert.pem'), `utf8`);

let credentials = {
    key: privateKey,
    cert: certificate,
};

let server = https.createServer(credentials, app);
server.listen(443, () => {
    console.log("HTTPS Server started on port 443.");
});

const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80, () => {
    console.log(`HTTP Server started on port 80.`);
});

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}!`);
// });

module.exports = app;