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
    let newUser = await global.connection.query(`
        INSERT INTO user (username, email, hash, salt, worldRank, bestScore) 
        VALUES (${username}, ${email}, ${hash}, ${salt}, ${-1}, ${-1});`);
};

module.exports = {
    getUserByKey,
    createUser,
};