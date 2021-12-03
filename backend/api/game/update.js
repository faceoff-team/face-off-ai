const { updateGame } = require("../../db/game");
const BadRequestError = require("../../error/BadRequestError");

const validateCreateGameRequest = (body) => {
  if (body.gameID == undefined)
    throw new BadRequestError(`gameID must be defined.`, 400);

  if (body.gameID < 0) 
    throw new BadRequestError(`gameID must be positive.`, 400);
}

const handleUpdateGameRequest = async (req, res) => {
  validateCreateGameRequest(req.params);
  
  let game = await updateGame(req.params.gameID, req.body.high, req.body.low);
  
  res.status(200).json({
    success: true,
    msg: `Game updated successfully.`,
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

module.exports =  {
  handleUpdateGameRequest
};