/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for a specific score.
 * 
 * 10/21/21
 */

const handleGetScoreRequest = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Score retreived successfully.`,
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleGetScoreRequest(req, res);
  } catch (err) {
    next(err);
  }
}