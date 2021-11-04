/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for user_games.
 * 11/3/21
 */

const { getGame, getAllGames } = require("../../db/game");

/**
 * This function retreives all games the user owns.
 * @param {Object} req 
 * @param {Object} res 
 */

const handleGetAllUserGamesRequest = async (req, res) => {
  let games = await getAllGames();

  res.status(200).json({
    success: true,
    msg: `Games retreived successfully.`,
    games,
  });
};

/**
 * Get a single game object from the database.
 *  
 * @param {Object} req 
 * @param {Object} res 
 */

const handleGetGameRequest = async (req, res) => {
  let game = await getGame(req.params.id);

  res.status(200).json({
    success: true,
    msg: `Game retieved successfully.`,
    game,
  });
};

module.exports = {
  async getAll(req, res, next) {
    try {
      await handleGetAllUserGamesRequest(req, res);
    } catch (err) {
      next(err);
    }
  },
  async get(req, res, next) {
    try {
      await handleGetGameRequest(req, res);
    } catch (err) {
      next(err);
    }
  },
}