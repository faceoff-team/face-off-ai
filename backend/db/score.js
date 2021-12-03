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
    SELECT game.gameDate, game.winnerScore, user_game.finalScore FROM user_game
    INNER JOIN game ON user_game.game = game.gameID
    WHERE user_game.user == "${user.userID}"`);
    try {
        let user = await new Promise((resolve, reject) => {
            global.connection.query(`
                SELECT game.gameDate, game.winnerScore, user_game.finalScore FROM user_game
                INNER JOIN game ON user_game.game = game.gameID
                WHERE user_game.user == "${user.userID}"`, (err, results, fields) => {

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

const addScoreToGame = async (userid, gameid, score) => {
  let query = 
    `
    INSERT INTO user_game (user, game, finalScore)
    VALUES (${userid}, ${gameid}, ${score});
    `;

  let game = await queryPromise(query);
};

//New APIs below

/**
 * This function updates a guest_game with the score passed.
 *  
 * @param {Number} id The id of the guest_game object. 
 * @param {Number} score The score to update the guest_game with. 
 */

 const addScoreToGuestGame = async (name, gameid, score) => {
  let query = 
    `
    INSERT INTO guest_game (user, game, finalScore)
    VALUES (${name}, ${gameid}, ${score});
    `;

  let game = await queryPromise(query);
};

/**
 * This function gets all names and scores for a game
 *  
 * @param {Number} gameid The game UUID of the user_game object.  
 */

 const getScoresForGame = async (gameid) => {
  let query = 
    `
    SELECT game.gameDate, user.username, user_game.finalScore FROM user_game
    INNER JOIN game ON user_game.game = game.gameID AND user_game.user = user.userID
    WHERE user_game.gameUUID == "${gameid}"
    `;

  let game = await queryPromise(query);
};

/**
 * This function gets all names and scores for a game
 *  
 * @param {Number} gameid The game UUID of the user_game object.  
 */

 const getGuestScoresForGame = async (gameid) => {
  let query = 
    `
    SELECT game.gameDate, guest.guestName, guest_game.finalScore FROM guest_game
    INNER JOIN game ON guest_game.game = game.gameID AND guest_game.guest = guest.guestName
    WHERE guest_game.gameUUID == "${gameid}"
    `;

  let game = await queryPromise(query);
};

module.exports = {
  getUserScores,
  addScoreToGame,
  getScoresForGame
};