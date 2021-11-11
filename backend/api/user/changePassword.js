/**
 * @author Nic Ballesteros
 * @description This file handles all requests to change a user's password.
 * 11/11/21
 */

const handleChangePasswordRequest = async (req, res) => {

};

module.exports = async (req, res, next) => {
  try {
    handleChangePasswordRequest(req, res);
  } catch (err) {
    next(err);
  }
};