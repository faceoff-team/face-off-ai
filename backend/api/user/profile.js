/**
 * @author Nic Ballesteros
 * @description File handles all requests for a user's profile.
 * 
 * 10/17/21
 */

const BadRequestError = require("../../error/BadRequestError");

const { updateProfile, getUserByKey } = require("../../db/user");

const handleGetProfile = async (req, res) => {
    let user = {};
    if (req.user) {    
        user = req.user;
        delete user.hash;
        delete user.salt;
    } else {
        user = await getUserByKey(req.params.id);
    }
    
    if (!user) {
        throw BadRequestError(`No id provided.`);
    }

    res.status(200).json({
        success: true,
        msg: "Private profile retreived.",
        user: user,
    });
};

const validatePutProfile = (body) => {
    if (typeof body.bio !== 'string') 
        throw new BadRequestError(`bio must be of type string.`, 400);

    if (typeof body.username !== 'string')
        throw new BadRequestError(`username must be of type string.`, 400);
}

const handlePutProfile = async (req, res) => {
    validatePutProfile(req.body);

    let bio = req.body.bio;
    let username = req.body.username;

    if (!req.body.bio) {
        bio = req.user.bio;
    }

    if (!req.body.username) {
        username = req.user.username;
    }

    let profile = await updateProfile(username, bio);

    res.status(200).json({
        success: true,
        msg: "Profile updated.",
        profile,
    });
};

module.exports = {
    getProfile: async (req, res, next) => {
        try {
            await handleGetProfile(req, res);
        } catch (err) {
            next(err);
        }
    },
    putProfile: async (req, res, next) => {
        try {
            await handlePutProfile(req, res);
        } catch (err) {
            next(err);
        }
    }
};