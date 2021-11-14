/**
 * @author Nic Ballesteros, Ashton Statz
 * @description This file helps query/modify the database
 * 
 * 11/13/21
 */

const { queryPromise } = require(".");

const getUserScores = async (user) => {
  let query = `SELECT * FROM user_game WHERE user = ${user.userID}`;

  let userScores = await queryPromise(query);

  console.log(`
    SELECT * FROM user_game
    WHERE user == "${user.userID}"`);
    try {
        let user = await new Promise((resolve, reject) => {
            global.connection.query(`
                SELECT * FROM user_game
                WHERE user == "${user.userID}"`, (err, results, fields) => {

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
  
  return userScores.results;
}

/**
 * This function updates a user_game with the score passed.
 *  
 * @param {Number} id The id of the user_game object. 
 * @param {Number} score The score to update the user_game with. 
 */

const addScoreToGame = async (id, score) => {
  let query = 
    `UPDATE user_game 
     SET score = ${score}
     WHERE gameID = ${id}`;

  let game = await queryPromise(query);
};

module.exports = {
  getUserScores,
};