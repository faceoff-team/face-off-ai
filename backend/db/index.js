/**
 * @author Nic Ballesteros
 * @description This file initializes a connetion to the database.
 */

const mysql = require('mysql2');

//Create connection variable.

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : 'faceoff',
  password : process.env.DB_PASS,
  database : 'faceoff'
});

global.connection = connection;

/**
 * This function returns a promise for the query that needs to be executed.
 *  
 * @param {String} query The query that needs to be executed
 * @returns {Promise} The response from the server.
 */

const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
        if (err) {
            reject(err);
            return;
        }

        resolve({
            results,
            fields,
        });
    }); 
  });
};

module.exports = {
  connection,
  queryPromise,
};
