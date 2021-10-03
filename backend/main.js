const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'faceoff-db',
    user     : 'faceoff',
    password : 'FaceoffAIRocks',
    database : 'faceoff'
});

    connection.connect((err) => {
        if (err) {
            console.error(err);
            return;
        }
    
        console.log(`Connected to MySQL as theadID: ${connection.threadId}`);
        clearInterval();
    });

app.use(express.static("static"));

app.get('*', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});