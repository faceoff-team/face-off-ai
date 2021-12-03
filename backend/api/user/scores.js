/**
 * @author Nic Ballesteros
 * @description This file handles all requests for all user scores.
 * 
 * 10/22/21
 */

const { getUserScores, getScoresForGame } = require(`../../db/score`);

const handleGetGameScores = async (req, res) => {
  let scores = await getScoresForGame()
  
  res.status(200).json({
    success: true,
    msg: "User scores retrieved.",
    scores,
  });
};

const handleGetUserScores = async (req, res) => {
  let scores = await getUserScores()
  
  res.status(200).json({
    success: true,
    msg: "User scores retrieved.",
    scores,
  });
};

module.exports = {
  userScoreGet:  async (req, res, next) => {
    try {
      await handleGetUserScores(req, res);
    } catch (err) {
      next(err);
    }
  },
  scoresForGameGet:  async (req, res, next) => {
    try {
      await handleGetGameScores(req, res);
    } catch (err) {
      next(err);
    }
  },
}