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
const { updateProfilePicture, getUserProfilePicName } = require('../../db/user');


//TODO make this an env var
//const profilePics = process.env.;

/**
 * This function changes the profile pic in the database.
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const handleChangeProfilePictueRequest = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError(`File object does not exist.`, 400);
  }

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

  console.log(`Saving user profile pic under ${userFilename}`);

  try {
    await fs.writeFile(path.join(`/usr/src/app/profilePics`, userFilename), file.data);
  } catch (err) {
    console.error(err);
  }

  let oldFile = await getUserProfilePicName(req.user.userID);

  await updateProfilePicture(req.user.userID, userFilename);

  try {
    await fs.rm(path.join(__dirname, `../../profilePics/${oldFile}`));
  } catch (err) {
    throw new DatabaseError('Could not remove old profile picture.', 500);
  }

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