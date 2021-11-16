/**
 * @author Nic Ballesteros
 * @description This file handles all requests for forgot password.
 * 11/15/21
 */

const { getUserByEmail, getUserbyUsername } = require('../../db/user');
const { sendMail } = require('../../email');
const BadRequestError = require('../../error/BadRequestError');
const crypto = require('crypto');
const { queryPromise } = require('../../db');

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
    
  let hash = crypto.randomBytes(32).toString('hex');

  let link = `https://ai.faceoff.cf/resetpassword/${hash}`;

  let html = `<p>A forgot password request has been submitted. Please click <a href="${link}">this link</a> to change your password</p>`;

  await sendMail(`${user.email}`, `Reset Password Request`, html); 
  
  await queryPromise(`INSERT INTO reset_password (user, hash) VALUES (${user.userID}, ${hash})`);

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