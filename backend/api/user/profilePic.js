/**
 * @author Nic Ballesteros
 * @description This file handles all requests to change the profile pic of a 
 * user.
 * 11/4/21
 */

const uuid = require('uuid');

const fs = require('fs/promises');
const path = require('path');
const BadRequestError = require('../../error/BadRequestError');
const { updateProfilePicture } = require('../../db/user');

const profilePics = '/home/faceoff/profilePics';

//TODO make this an env var
//const profilePics = process.env.;

/**
 * This function changes the profile pic in the database.
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const handleChangeProfilePictueRequest = async (req, res) => {
  //If no files are in the request, throw an error.
  if (Object.keys(req.files).length == 0) {
    throw new BadRequestError(`No file sent.`, 400);
  }

  //Get the file from the request.
  let file = req.files[''];
 
  //Get the extension of the file.
  let ext = file.name.split('.');

  ext = ext[ext.length - 1];

  //Give the file a name.
  let userFilename = `${uuid.v4()}.${ext}`;

  await fs.writeFile(path.join(profilePics, userFilename), file.data);

  await updateProfilePicture(req.user.userID, userFilename);

  res.status(200).json({
    success: true,
    msg: `Profile picture updated.`,
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleChangeProfilePictueRequest(req, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};