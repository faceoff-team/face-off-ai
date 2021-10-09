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

//Connect to the mysql server.
connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Connected to MySQL as theadID: ${connection.threadId}`);
    clearInterval();
});

const REACT = path.join(__dirname, `react`);

app.use(express.static(REACT));

app.get('*', (req, res) => {
    res.sendFile(path.join(REACT, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});