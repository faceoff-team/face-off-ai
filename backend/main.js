const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const path = require(`path`);

const { connection } = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route all api calls to api functions.
app.use('/api', require('./api/api'));

//Get the path of the react folder.
const REACT = path.join(__dirname, `react`);

//Serve all static files.
app.use(express.static(REACT));

//Send single page react app to user.
app.get('*', (req, res) => {
    res.sendFile(path.join(REACT, "index.html"));
});

//Error Handling for the user.
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

//Listen to incoming requests on the port specified by the Environment Variable.
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

module.exports = app;