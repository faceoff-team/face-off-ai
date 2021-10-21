const handleGetFriends = async (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Friends retreived.",

    });
};

const handlePostFriend = async (async, res) => {
    res.status(200).json({
        success: true,
        msg: "Friends retrieved.",

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
    postFriend: async (req, res, next) => {
        try {
            await handlePostFriend(req, res);
        } catch (err) {
            next(err);
        }
    }
};