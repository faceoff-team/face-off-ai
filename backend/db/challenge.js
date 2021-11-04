/**
 * @author Nic Ballesteros
 * @description This file handles all challenge queries to the server.
 * 11/3/21
 */

const { queryPromise } = require('./');

/**
 * This function retrieves all challenges in the database.
 *  
 * @returns Challenges in the database.
 */

const getAllChallenges = async () => {
  let query = `SELECT * FROM challenge;`;
  let challenges = await queryPromise(query);
  return challenges;
};

/**
 * This function retrieves the challenge with the corrisponding id.
 *  
 * @param {Number} id 
 * @returns challenge corrisponding to that id.
 */

const getChallenge = (id) => {
  let query = `SELECT * FROM challenge WHERE id == ${id};`;
  let challenge = await queryPromise(query);
  return challenge;
};

module.exports = {
  getAllChallenges,
  getChallenge,
};