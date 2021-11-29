/**
 * @author Nic Ballesteros
 * @description This file handles all create requests for scores.
 * 
 * 10/22/21
 */
import { addScoreToGame } from "../../db/score"

const handleCreateScoreRequest = async (req, res) => {
  const score = await addScoreToGame(req.body.user, req.body.game, req.body.score);
  res.status(200).json({
    success: true,
    msg: `Score created successfully.`,
    score
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleCreateScoreRequest(req, res);
  } catch (err) {
    next(err);
  }
};