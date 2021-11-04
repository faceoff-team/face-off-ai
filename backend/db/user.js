/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const mysql = require('mysql2');
const BadRequestError = require('../error/BadRequestError');

//connection is defined globally.

const getUserByKey = async (key) => {
    console.log(`
    SELECT * FROM user WHERE userID = "${key}"`);
    try {
        let user = await new Promise((resolve, reject) => {
                global.connection.query(`
                SELECT * FROM user WHERE userID = "${key}"`, (err, results, fields) => {
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
        return user.results;
    } catch (err) { 
        console.error(err);
    }
};

const createUser = async (username, email, hash, salt) => {
    console.log(`
    INSERT INTO user (username, email, hash, salt, worldRank, bestScore) 
    VALUES ("${username}", "${email}", "${hash}", "${salt}", ${-1}, ${-1});`);
    try {
        let newUser = await new Promise((resolve, reject) => {
                global.connection.query(`
                    INSERT INTO user (username, email, hash, salt, worldRank, bestScore, worstScore) 
                    VALUES ("${username}", "${email}", "${hash}", "${salt}", ${-1}, ${-1}, ${-1});`, (err, results, fields) => {
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
                SELECT * FROM user WHERE username = "${username}"`, (err, results, fields) => {
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
        return user.results;
    } catch (err) { 
        console.error(err);
    }
};

const getFriendsByUsername = async (user, username) => {
    console.log(`
    SELECT * FROM user 
    RIGHT JOIN friend ON friend.user2 = user.userID
    WHERE username == "${username}"`);
    try {
        let user = await new Promise((resolve, reject) => {
            global.connection.query(`
                SELECT * FROM user
                RIGHT JOIN friend ON friend.user2 = user.userID
                WHERE username == "${username}"`, (err, results, fields) => {
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
        return user.results;
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
                SELECT * FROM user WHERE email = "${email}"`, (err, results, fields) => {
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
        return user.results;
    } catch (err) { 
        console.error(err);
    }
};

const updateProfile = async (userid, username, bio) => {
    try {
        let user = await new Promise((resolve, reject) => {
            global.connection.query(`
                UPDATE user
                SET username = "${username}", bio = "${bio}",
                WHERE userID == ${userid}
            `, (err, results, fields) => {
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
    } catch (err) {
        console.error(err);
        throw new BadRequestError(`Could not update profile.`, 500);
    }
};

const getLeaderboard = async() => {
    try {
        console.log(`SELECT userID, worldRank, bestScore, username, imagePath 
        FROM user 
        ORDER BY worldRank`);
        let leaderboard = await new Promise((resolve, reject) => {
            global.connection.query(`
                SELECT userID, worldRank, bestScore, username, imagePath 
                FROM user 
                ORDER BY worldRank
            `, (err, results, fields) => {
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
        return leaderboard.results;
    } catch (err) {
        console.error(err);
        throw new BadRequestError(`Could not get leaderboard.`, 500);
    }
};

module.exports = {
    getUserByKey,
    getUserbyUsername,
    getUserByEmail,
    getFriendsByUsername,
    createUser,
    updateProfile,
    getLeaderboard,
};