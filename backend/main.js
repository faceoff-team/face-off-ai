const express = require('express');

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});