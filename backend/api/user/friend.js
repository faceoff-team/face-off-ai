const handleGetFriends = async (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Friends retreived.",

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
            
        } catch (err) {
            next(err);
        }
    }
};