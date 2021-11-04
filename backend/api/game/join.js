/**
 * @author Nic Ballesteros
 * @description This endpoint allows a user to join a game in the database.
 * 11/4/21
 */

const { joinGame } = require("../../db/game");
const BadRequestError = require("../../error/BadRequestError");

/**
 * This function validates that the request is in the correct format.
 *  
 * @param {Object} body The body to parse and validate.
 */

const validateJoinGameRequest = (body) => {
  if (body.gameID == undefined)
    throw new BadRequestError(`gameID must be defined.`, 400);

  if (typeof body.gameID !== 'number')
    throw new BadRequestError(`gameID must be a number.`, 400);
};

/**
 * This function adds a user to a game.
 *  
 * @param {Object} req 
 * @param {Object} res 
 */

const handleJoinGameRequest = async (req, res) => {
  validateJoinGameRequest(); 

  await joinGame(req.user.userID, req.body.gameID);

  res.status(200).json({
    success: true,
    msg: `Game joined successfully.`
  });
};

module.exports = async (req, res) => {
  try {
    await handleJoinGameRequest(req, res);
  } catch (err) {
    next(err);
  }
};