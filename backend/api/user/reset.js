/**
 * @author Nic Ballesteros
 * @description This file handles a password reset.
 */

const { queryPromise } = require('../../db');
const { generatePasswordHash } = require('../../db/auth');
const { changePassword } = require('../../db/user');
const BadRequestError = require('../../error/BadRequestError');

const validateResetPasswordBody = (body) => {
  if (!body)
    throw new BadRequestError(`Body not defined.`, 400);

  if (!body.password)
    throw new BadRequestError(`Password must be defined.`, 400);

  if (typeof body.password != 'string')
    throw new BadRequestError(`Password must be a string.`, 400);

  if (body.hash) {
    if (typeof body.hash != 'string')
      throw new BadRequestError(`Hash must be a string.`, 400);
  }
}

const handleResetPasswordAuthenticated = async (req, res) => {
  if (!req.body)
    throw new BadRequestError('Body must be defined.', 400);

  if (!req.body.password)
    throw new BadRequestError('Password must be defined', 400);

  if (typeof req.body.password != 'string')
    throw new BadRequestError(`Password must be a string.`, 400);

  if (req.body.password.length < 8)
    throw new BadRequestError(`Password must be more than 8 characters.`, 400);

  let { hash, salt} = generatePasswordHash(req.body.password);

  await changePassword(req.user.userID, hash, salt);

  res.status(200).json({
    success: true,
    msg: `Password changed successfully.`,
  });
};

const handleResetUserPassword = async (req, res) => { 
  validateResetPasswordBody(req.body);

  let query = 
    `SELECT * FROM reset_password
     WHERE hash = "${req.params.hash}"`;

  let { results: rows } = await queryPromise(query);

  if (rows.length != 1)
    throw new BadRequestError(`Hash not found.`, 404);

  let row = rows[0];

  if (Date.now() > row.expires * 1000) {
    let query = 
      `DELETE FROM reset_password
       WHERE hash = "${row.hash}"`;
    await queryPromise(query);
    throw new BadRequestError('Link has expired.');
  }

  let { hash, salt } = generatePasswordHash(req.body.password);

  changePassword(row.user, hash, salt);

  res.status(200).json({
    success: true,
    msg: `Password reset successfully.`,
  });
};

module.exports = {
  changeAuthPassword: async (req, res, next) => {
    try {
      await handleResetPasswordAuthenticated(req, res);
    } catch (err) {
      next(err);
    }
  },
  changeUserPassword: async (req, res, next) => {
    try {
      await handleResetUserPassword(req, res);
    } catch (err) {
      next(err);
    }
  },
};