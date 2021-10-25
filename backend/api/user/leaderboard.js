/**
 * @author Ashton Statz
 * @description this module handles all leaderboard requests
 */

const { getLeaderboard } = require("../../db/user");
const BadRequestError = require("../../error/BadRequestError");


const handleGetLeaderboard = async (req, res) => {

    let leaderboard = await getLeaderboard();

    res.status(200).json({
        success: true,
        msg: "Leaderboard retreived.",
        leaderboard : req.leaderboard,
    });
};

const handlePutLeaderboard = async (async, res) => {

    // Add functionality for updating a leaderboard?
    // may not be necessary since we would just update a
    // single user's score

    res.status(200).json({
        success: true,
        msg: "Leaderboard updated.",

    });

};

module.exports = {
    getLeaderboard: async (req, res, next) => {
        try {
            await handleGetLeaderboard(req, res);
        } catch (err) {
            next(err);
        }
    },
    postLeaderboard: async (req, res, next) => {
        try {
            await handlePutLeaderboard(req, res);
        } catch (err) {
            next(err);
        }
    }
};