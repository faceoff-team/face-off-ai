/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for challenges
 */

const handleGetAllChallengesRequest = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Challenges retreived successfully.`
  });
};

const handleGetChallengeRequest = async (req, res) => {
  let challenge = req.params.challenge;

  res.status(200).json({
    success: true,
    msg: `Challenge retrieved successfully.`,
  });
};

module.exports = {
  /**
   * Wrapper for getting all the challenges in database.
   *  
   * @param {Object} req 
   * @param {Object} res 
   * @param {Object} next 
   */
  async getAll(req, res, next) {
    try {
      
    } catch (err) {
      next(err);
    }
  },
  /**
   * Gets a single challenge based on id.
   *  
   * @param {Object} req 
   * @param {Object} res 
   * @param {Object} next 
   */
  async get(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }

}