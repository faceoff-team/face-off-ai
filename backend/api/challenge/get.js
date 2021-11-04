/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for challenges
 */

const { getChallenge, getAllChallenges } = require("../../db/challenge");

const handleGetAllChallengesRequest = async (req, res) => {
  let challenges = await getAllChallenges();

  res.status(200).json({
    success: true,
    msg: `Challenges retreived successfully.`,
    challenges,
  });
};

/**
 * This function handles all get challenge requests for a specific challenge.
 *  
 * @param {Object} req 
 * @param {Object} res 
 */

const handleGetChallengeRequest = async (req, res) => {
  let challenge = req.params.challenge;

  challenge = getChallenge(challenge);

  res.status(200).json({
    success: true,
    msg: `Challenge retrieved successfully.`,
    challenge,
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