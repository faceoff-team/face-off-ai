/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const mysql = require('mysql2');

//connection is defined globally.

const getUserByKey = async (key) => {
    let user = await global.connection.query(`SELECT * FROM user WHERE userID == ${key};`);

    return user;
};

const createUser = async (username, email, hash, salt) => {
    console.log(`
    INSERT INTO user (username, email, hash, salt, worldRank, bestScore) 
    VALUES ("${username}", "${email}", "${hash}", "${salt}", ${-1}, ${-1});`);
    try {
        let newUser = await new Promise((resolve, reject) => {
                global.connection.query(`
                    INSERT INTO user (username, email, hash, salt, worldRank, bestScore) 
                    VALUES ("${username}", "${email}", "${hash}", "${salt}", ${-1}, ${-1});`, (err, results, fields) => {
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
        return newUser;
    } catch (err) { 
        console.error(err);
    }
};

const getUserbyUsername = async (username) => {
    console.log(`
    SELECT * FROM user WHERE username == "${username}"`);
    try {
        let user = await new Promise((resolve, reject) => {
                global.connection.query(`
                SELECT * FROM user WHERE username == "${username}"`, (err, results, fields) => {
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
        return user;
    } catch (err) { 
        console.error(err);
    }
};

const getUserByEmail = async (email) => {
    console.log(`
    SELECT * FROM user WHERE email == "${email}"`);
    try {
        let user = await new Promise((resolve, reject) => {
                global.connection.query(`
                SELECT * FROM user WHERE email == "${email}"`, (err, results, fields) => {
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
        return user;
    } catch (err) { 
        console.error(err);
    }
};

module.exports = {
    getUserByKey,
    getUserbyUsername,
    getUserByEmail,
    createUser,
};