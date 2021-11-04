/**
 * @author Nic Ballesteros
 * @description This file helps modify the database.
 * 
 * 10/22/21
 */

const { queryPromise } = require(".");

const getUserScores = async (user) => {
  let query = `SELECT * FROM user_game WHERE user = ${user.userID}`;

  let userScores = await queryPromise(query);
  
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