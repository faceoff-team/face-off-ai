/**
 * @author Ashton Statz
 * @description this module handles all leaderboard requests
 */

const { getLeaderboard } = require("../../db/user");
const BadRequestError = require("../../error/BadRequestError");

const validateGetLeaderboardBody = (body) => {
    if (body.username === undefined)
        throw new BadRequestError(`Username property required.`, 400);

    if (typeof body.username !== 'string')
        throw new BadRequestError(`Username must be of type string.`, 400);

}

const handleGetLeaderboard = async (req, res) => {
    validateGetLeaderboardBody(req.body);

    let leaderboard = await getLeaderboard();

    res.status(200).json({
        success: true,
        msg: "Leaderboard retreived.",
        leaderboard,
    });
};

const handlePostLeaderboard = async (async, res) => {

    res.status(200).json({
        success: true,
        msg: "Leaderboard updated.",

    });

};

module.exports = {
    getFriends: async (req, res, next) => {
        try {
            await handleGetLeaderboard(req, res);
        } catch (err) {
            next(err);
        }
    },
    postFriend: async (req, res, next) => {
        try {
            await handlePostLeaderboard(req, res);
        } catch (err) {
            next(err);
        }
    }
};