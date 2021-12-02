/**
 * @author Nic Ballesteros
 * @description This module handles all login requests.
 */

const { verifyPassword, issueJWT } = require("../../db/auth");
const { getUserByUsername, getUserByEmail } = require("../../db/user");
const AuthorizationError = require("../../error/AuthorizationError");
const BadRequestError = require("../../error/BadRequestError");

/**
 * This function returns the user with user as their email or username.
 * 
 * @param {String} user Either a username of an email. 
 * @returns {Object} The user object in the database.
 */

const getUser = async (user) => {
    let promises = [getUserByUsername(user), getUserByEmail(user)];
    let users = await Promise.all(promises);

    if (users[0].length == 0 && users[1].length == 0)
        throw new BadRequestError("No user exists.", 404);

    if (users[0].length != 0) {
        return users[0][0];
    }

    //TODO check that only one result is returned.
    //TODO make @ symbol illegal for usernames.

    return users[1][0];
}

/**
 * @description This function validates the values in payload to ensure that the
 * process will not hit any snags. If there is an issue with validation, an error
 * is thrown and sent to the user via express error handling.
 * 
 * @param {Object} body 
 */

 const validateLoginBody = (body) => {
    //Get the number of identifiers in the object.
    let numberOfIdentifiers = Object.keys(body).length;

    if (numberOfIdentifiers !== 2) 
        throw new BadRequestError('Unknown Identifier.', 400);

    if (typeof body.user !== 'string')
        throw new BadRequestError('user must be of type string.', 403);

    if (body.user.length === 0) 
        throw new BadRequestError('user must not be an empty string.', 403);

    if (body.user.match(/^\S*$/) == null)
        throw new BadRequestError('user must not have whitespace.', 403);

    if (typeof body.password !== 'string')
        throw new BadRequestError('password must be of type string.', 403);

    if (body.password.length === 0) 
        throw new BadRequestError('password must not be an empty string.', 403);
};

const handleLoginRequest = async (req, res) => {
    //Validate the login body.
    validateLoginBody(req.body);

    let user = await getUser(req.body.user);

    if (!verifyPassword(req.body.password, user.salt, user.hash)) 
        throw new AuthorizationError(`Username or password incorrect.`, 401);
    
    let token = issueJWT(user.userID);

    res.status(200).json({
        success: true,
        msg: `User successfully logged in.`,
        token,
    });
};

module.exports = async (req, res, next) => {
    try {
        await handleLoginRequest(req, res);
    } catch (err) {
        next(err);
    }
}