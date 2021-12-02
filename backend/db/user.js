/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const { queryPromise } = require('.');
const BadRequestError = require('../error/BadRequestError');
const DatabaseError = require('../error/DatabaseError');

//connection is defined globally.

const getUserByKey = async (key) => {
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

        if (user.results > 1) {
          throw new DatabaseError(`Should not happen. Duplicate keys.`, 500);
        }

        return user.results[0];
    } catch (err) { 
        console.error(err);
    }
};

const createUser = async (username, email, hash, salt) => {
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

const getUserByUsername = async (username) => {
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
                SET username = "${username}", bio = "${bio}"
                WHERE userID = "${userid}";
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

const updateProfilePicture = async (id, filename) => {
  try {
    let query = `
        UPDATE user
        SET imagePath = "${filename}"
        WHERE userID = ${id};
    `;

    await queryPromise(query);
  } catch (err) {
    console.error(err);
    throw new DatabaseError(`Could not update user image in db.`);
  }
};

const getUserProfilePicName = async (id) => {
  try {
    let query = `
      SELECT imagePath FROM user
      WHERE userID = ${id}
    `;

    let obj = await queryPromise(query);

    if (obj.results.length > 1) {
      throw Error('This should never happen. Duplicate Primary Keys.');
    }

    return obj.results[0].imagePath;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const changePassword = async (userID, hash, salt) => {
  let query = 
    `UPDATE user
     SET hash = "${hash}
     SET salt = "${salt}
     WHERE userID = ${userID}`;

  await queryPromise(query);
};

module.exports = {
  getUserByKey,
  getUserByUsername,
  getUserByEmail,
  getFriendsByUsername,
  createUser,
  updateProfile,
  getLeaderboard,
  updateProfilePicture,
  getUserProfilePicName,
  changePassword,
};