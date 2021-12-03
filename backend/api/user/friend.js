/**
 * @author Ashton Statz, Nic Ballesteros
 * @description this module handles all friend related requests
 */

const { getFriendsByUsername } = require("../../db/user");
const BadRequestError = require("../../error/BadRequestError");

const validateGetFriendsBody = ( body ) => {
  if (body.username === undefined)
    throw new BadRequestError(`Username property required.`, 400); 

  if (typeof body.username !== 'string') 
    throw new BadRequestError(`Username must be of type string.`, 400);
  
}

const handleGetFriends = async (req, res) => {
  //validateGetFriendsBody(req.body);
  let username = req.username;

  let friends = await getFriendsByUsername(username);

  res.status(200).json({
    success: true,
    msg: "Friends retreived. HEDRE",
    friends,
  });
};

const handlePostFriend = async (async, res) => {

  res.status(200).json({
    success: true,
    msg: "Friend created.",

  });

};

module.exports = {
  getFriends: async (req, res, next) => {
    try {
      await handleGetFriends(req, res);
    } catch (err) {
      next(err);
    }
  },
  getFriendsByUser: async (req, res, next) => {
    try {
        await handleGetFriends(req, res);
    } catch (err) {
        next(err);
    }
  },
  postFriend: async (req, res, next) => {
    try {
      await handlePostFriend(req, res);
    } catch (err) {
      next(err);
    }
  }
};