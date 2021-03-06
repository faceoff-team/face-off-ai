/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const { generatePasswordHash, issueJWT } = require("../../db/auth");
const { createUser, getUserByEmail, getUserByUsername } = require("../../db/user");
const BadRequestError = require("../../error/BadRequestError");

/**
 * Checks if the user parameters already exist in the database.
 * 
 * @param {String} username The username to check exists in the database.
 * @param {String} email The email to check exists in the database.
 * @returns {Boolean} True if the user exists and false else.
 */

const checkUserExists = async (username, email) => {
    let usernameUser = await getUserByUsername(username); 
    let emailUser = await getUserByEmail(email);

    if (usernameUser.length != 0)
      throw new BadRequestError(`Username already in use.`, 403);

    if (emailUser.length != 0)
      throw new BadRequestError(`Email already in use.`, 403);

    return false;
}

/**
 * This function validates the body passed to the register api endpoint. This is
 * to ensure that problems in the request do not work their way into later code
 * and cause large breaks in the system.
 * 
 * @param {Object} body The body to validate.
 */

const validateRegisterBody = (body) => {
    let numberOfIdentifiers = Object.keys(body).length;

    if (numberOfIdentifiers !== 3) 
        throw new BadRequestError('Unknown Identifier.', 400);

    if (typeof body.email !== 'string')
        throw new BadRequestError('Email must be of type string.', 400);

    if (body.email.length === 0)
        throw new BadRequestError('Email must not be an empty string.', 400);

    if (body.email.match(/\S+\@+\S+\.+\S/) == null)
        throw new BadRequestError('Email malformed.', 400);

    if (typeof body.username !== 'string') 
        throw new BadRequestError('Username must be of type string.', 400);

    if (body.username.length === 0) 
        throw new BadRequestError('Username must not be an empty string.', 400);

    if (body.username.match(/^\S*$/) == null) 
        throw new BadRequestError('Username must not have whitespace.', 400);

    if (body.username.match(/@/) != null) 
        throw new BadRequestError('Username must not have an \'@\' symbol.', 400)

    if (typeof body.password !== 'string')
        throw new BadRequestError('Password must be of type string.', 400);

    if (body.password.length < 8)
        throw new BadRequestError('Password must have a length of at least 8 characters.', 400);

    if (body.password.match(/^\S*$/) == null) 
        throw new BadRequestError('Password must not have whitespace.', 400);
};

const handleRegisterRequest = async (req, res) => {
    //Validate the body.
    validateRegisterBody(req.body);

    //Check to see if the user exists and if it does, throw an error.
    if ((await checkUserExists(req.body.username, req.body.email))) {
        throw new BadRequestError(`Either username or email already exists.`, 403);
    };

    //Genereate a password hash for the user's password.
    let { hash, salt } = generatePasswordHash(req.body.password);

    //Create the user.
    await createUser(req.body.username, req.body.email, hash, salt);

    let user = await getUserByEmail(req.body.email);

    let token = issueJWT(user.userID);

    res.status(200).json({
        success: true,
        msg: `User created.`,
        token,
    });
};

module.exports = async (req, res, next) => {
    try {
        await handleRegisterRequest(req, res);
    } catch (err) {
        next(err);
    }
}
