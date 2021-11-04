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

const createGame = async (video) => {
  let query = `
    INSERT INTO game (videoID)
    VALUES (${video.videoID});
  `;

  let game = await queryPromise(query)

  return game.results;
};

/**
 * Retreives a single game from the database with the given id.
 *  
 * @param {Number} id 
 * @returns {Object} The results from the get game query.
 */

const getGame = async (id) => {
  let query = `
    SELECT * FROM game
    WHERE gameID = ${id}`;

  let game = await queryPromise(query);

  return game.results;
};

/**
 * Retreives all games in database. 
 */

const getAllGames = async () => {
  let query = `
    SELECT * FROM game LIMIT 100
  `;

  let games = await queryPromise(query);

  return games.results;
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
  joinGame,
};