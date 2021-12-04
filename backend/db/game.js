/**
 * @author Nic Ballesteros
 * @description This file handles all db requests for the game module.
 */

const { queryPromise } = require('.');

/**
 * This function creates a new game.
 *  
 * @param {Number} video The id of the video object in the database.
 * @returns 
 */

const createGame = async (video, gameUUID) => {
  let date = new Date();
  let query = `
    INSERT INTO game (videoID, gameUUID, winnerScore, lowScore, gameDate)
    VALUES (${video}, "${gameUUID}", 0, 2147483647, CURRENT_TIMESTAMP);
  `;

  let game = await queryPromise(query)

  return game.results;
};

// const createUserGame = async (user, game) => {
//   let query = `
//     INSERT INTO user_game ()
//   `
// }

/**
 * Retreives a single game from the database with the given id.
 *  
 * @param {Number} id 
 * @returns {Object} The results from the get game query.
 */

const getGame = async (id) => {
  let query = `
    SELECT * FROM game
    WHERE gameUUID = "${id}"`;

  let game = await queryPromise(query);

  return game.results;
};

/**
 * Retreives all games in database. 
 */

const getAllUserGames = async (usrnm) => {
    let query = `
        SELECT * FROM game
        INNER JOIN user_game
        ON game.gameID = user_game.game
        INNER JOIN user
        ON user_game.user = user.userID
        WHERE user.username = "${usrnm}"
        LIMIT 10;
    `;

    let games = await queryPromise(query);

    return games.results;
};

const getAllGames = async () => {
  let query = `SELECT * FROM game;`;

  let games = await queryPromise(query);

  return games.results;
}

const updateGame = async (id, high, low, king, loser) => {
  if (king && loser) {
    try {
      let game = await new Promise((resolve, reject) => {
          global.connection.query(`
              UPDATE game
              SET winnerScore = ${high}, lowScore = ${low}, heldByWin = "${king}", heldByLoss = "${loser}"
              WHERE gameUUID = "${id}";
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
        throw new BadRequestError(`Could not update game.`, 500);
    }
  }
  else if (king) {
    try {
      let game = await new Promise((resolve, reject) => {
          global.connection.query(`
              UPDATE game
              SET winnerScore = ${high}, lowScore = ${low}, heldByWin = "${king}"
              WHERE gameUUID = "${id}";
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
        throw new BadRequestError(`Could not update game.`, 500);
    }
  }
  else if (loser) {
    try {
      let game = await new Promise((resolve, reject) => {
          global.connection.query(`
              UPDATE game
              SET winnerScore = ${high}, lowScore = ${low}, heldByLoss = "${loser}"
              WHERE gameUUID = "${id}";
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
        throw new BadRequestError(`Could not update game.`, 500);
    }
  }
  else {
    try {
      let game = await new Promise((resolve, reject) => {
          global.connection.query(`
              UPDATE game
              SET winnerScore = ${high}, lowScore = ${low}
              WHERE gameUUID = "${id}";
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
        throw new BadRequestError(`Could not update game.`, 500);
    }

  }
  
};

/**
 * Lets a user join a game.
 * 
 * @param {Number} user
 * @param {Number} game
 * @returns {Object} the user_game object created.
 */

const joinGame = (user, game) => {

};

module.exports = {
  createGame,
  getGame,
  getAllGames,
  getAllUserGames,
  joinGame,
  updateGame
};