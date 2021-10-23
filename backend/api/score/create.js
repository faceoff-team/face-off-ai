/**
 * @author Nic Ballesteros
 * @description This file handles all create requests for scores.
 * 
 * 10/22/21
 */

const handleCreateScoreRequest = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Score created successfully.`,
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleCreateScoreRequest(req, res);
  } catch (err) {
    next(err);
  }
};