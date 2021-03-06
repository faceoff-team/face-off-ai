/**
 * @author Nic Ballesteros
 * @description File handles all requests for a user's profile.
 * 
 * 10/17/21
 */

const BadRequestError = require("../../error/BadRequestError");

const { updateProfile, getUserByUsername, updateProfileScores } = require("../../db/user");

const handleGetProfile = async (req, res) => {
    let user = {};
    
    if (req.user) {    
        user = req.user;
        delete user.hash;
        delete user.salt;
    } else {
        user = await getUserByUsername(req.params.username);
        delete user.hash;
        delete user.salt;
    }
    
    if (!user) {
        throw BadRequestError(`No username provided.`);
    }

    res.status(200).json({
        success: true,
        msg: "Profile retreived.",
        user,
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
    let id = req.body.id;
    let pic = req.body.photo;

    if (!req.body.bio) {
        bio = req.user.bio;
    }

    if (!req.body.username) {
        username = req.user.username;
    }

    let profile = await updateProfile(id, username, bio, pic);

    res.status(200).json({
        success: true,
        msg: "Profile updated.",
        profile,
    });
};

const handleUpdateUserScores = async (req, res) => {
    let id = req.body.id;
    let score = req.body.score;

    let profile = await updateProfileScores(id, score);
    res.status(200).json({
        success: true,
        msg: "Scores updated."
    });
}

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
    },
    putProfileScores: async (req, res, next) => {
        try {
            await handleUpdateUserScores(req, res);
        }
        catch (err) {
            next(err);
        }
    }
};