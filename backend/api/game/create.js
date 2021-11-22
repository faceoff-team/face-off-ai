/**
 * @author Nic Ballesteros
 * @description This file creates a new game for a user.
 * 11/4/21
 */

const { createGame } = require("../../db/game");
const BadRequestError = require("../../error/BadRequestError");

const validateCreateGameRequest = (body) => {
  if (body.videoID == undefined)
    throw new BadRequestError(`videoID must be defined.`, 400);

  if (body.videoID < 0) 
    throw new BadRequestError(`videoID must be positive.`, 400);
}

const handleCreateGameRequest = async (req, res) => {
  validateCreateGameRequest(req.body);
  
  let game = await createGame(req.body.videoID);
  
  res.status(200).json({
    success: true,
    msg: `Game created successfully.`,
    game,
  });
};

// const handleCreateUserGameRequest = async (req, res) => {
//   let game = await createUserGame(req.body.user, req.body.game);

//   res.status(200).json({
//     success: true,
//     msg: "User game created successfully",
//     game,
//   });
// }

module.exports =  async (req, res, next) => {
  try {
    await handleCreateGameRequest(req, res); 
  } catch (err) {
    next(err);
  }
};