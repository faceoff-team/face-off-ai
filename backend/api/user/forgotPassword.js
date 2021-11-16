/**
 * @author Nic Ballesteros
 * @description This file handles all requests for forgot password.
 * 11/15/21
 */

const { getUserByEmail, getUserbyUsername } = require('../../db/user');
const { sendMail } = require('../../email');
const BadRequestError = require('../../error/BadRequestError');

const handleChangePasswordRequest = async (req, res) => {
  if (!req.body.user)
    throw BadRequestError(`No user name given.`, 404);
 
  let user;

  if (req.body.user.includes('@')) {
    user = await getUserbyEmail(req.body.user);
  } else {
    user = await getUserbyUsername(req.body.user);
  }

  //TODO change the return value of getUserByEmail from array to object.

  user = user[0];

  console.log(user);

  if (!user.email) {
    res.status(200).json({
      success: true,
      msg: `Change password request proccessed.`,
    });
    return;
  }
    
  await sendMail(`${user.email}`, `Reset Password Request`, `<p>Go to this link to reset your password. ${'this is a link'}</p>`); 
  
  res.status(200).json({
    success: true,
    msg: `Change password request proccessed.`,
  });
};

module.exports = async (req, res, next) => {
  try {
    handleChangePasswordRequest(req, res);
  } catch (err) {
    next(err);
  }
};