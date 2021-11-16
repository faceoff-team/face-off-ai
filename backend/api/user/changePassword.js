/**
 * @author Nic Ballesteros
 * @description This file handles all requests to change a user's password.
 * 11/11/21
 */

const { sendMail } = require('../../email');
const BadRequestError = require('../../error/BadRequestError');

const handleChangePasswordRequest = async (req, res) => {
  if (!req.user.email) 
    throw new BadRequestError(`User does not have an email.`, 400);

  let transport = await createTransport();

  await sendMail({
    to: `${req.user.email}`,
    subject: `Reset Password Request`,
    html: `<p>Go to this link to reset your password. ${'this is a link'}</p>`,
  }); 
  
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