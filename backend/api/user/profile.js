/**
 * @author Nic Ballesteros
 * @description File handles all requests for a user's profile.
 * 
 * 10/17/21
 */

const handleGetPrivateProfile = async (req, res) => {    
    res.status(200).json({
        success: true,
        msg: "Private profile retreived.",
        user: req.user,
    });
};

const handlePutProfile = async (req, res) => {
    console.log(req.body);

    res.status(200).json({
        success: true,
        msg: "Profile updated.",
    });
};

module.exports = {
    privateProfile: async (req, res, next) => {
        try {
            await handleGetPrivateProfile(req, res);
        } catch (err) {
            next(err);
        }
    },
    publicProfile: async (req, res, next) => {
        try {
            await handleGetPrivateProfile(req, res);
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