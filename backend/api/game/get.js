/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for user_games.
 * 11/3/21
 */

const handleGetAllChallengesRequest = async (req, res) => {

  res.status(200).json({
    success: true,
    msg: `Games retreived successfully.`,
  });
};

const handleGetUserGameRequest = (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Game retieved successfully.`,
  });
};

module.exports = {
  getAll(req, res, next) {
    try {
      await handleGetAllUserGamesRequest(req, res);
    } catch (err) {
      next(err);
    }
  },
  get(req, res, next) {
    try {
      await handleGetUserGameRequest(req, res);
    } catch (err) {
      next(err);
    }
  },
}