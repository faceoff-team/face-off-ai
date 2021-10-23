/**
 * @author Nic Ballesteros
 * @description This file handles all requests for all user scores.
 * 
 * 10/22/21
 */

const { getUserScores } = require(`../../db/score`);

const handleGetUserScores = async (req, res) => {
  let scores = await getUserScores()
  
  res.status(200).json({
    success: true,
    msg: `Retreived user scores.`,
    scores,
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleGetUserScores(req, res);
  } catch (err) {
    next(err);
  }
}