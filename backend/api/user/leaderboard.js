/**
 * @author Ashton Statz
 * @description this module handles all leaderboard requests
 */

const { getLeaderboard } = require("../../db/user");

const handleGetLeaderboard = async (req, res) => {
    let leaderboard = await getLeaderboard();
    console.log(leaderboard);

    res.status(200).json({
        success: true,
        msg: "Leaderboard retreived.",
        leaderboard,
    });
};

module.exports = async (req, res, next) => {
    try {
        await handleGetLeaderboard(req, res);
    } catch (err) {
        next(err);
    }
};