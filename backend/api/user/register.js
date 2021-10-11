/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const { generatePasswordHash } = require("../../db/auth");
const { createUser } = require("../../db/user");
const BadRequestError = require("../../error/BadRequestError");

const validateRegisterBody = (body) => {
    let numberOfIdentifiers = Object.keys(body).length;

    if (numberOfIdentifiers !== 3) 
        throw new BadRequestError('Unknown Identifier.', 400);

    if (typeof payload.email !== 'string')
        throw new BadRequestError('Email must be of type string.', 400);

    if (payload.email.length === 0)
        throw new BadRequestError('Email must not be an empty string.', 400);

    if (payload.email.match(/\S+\@+\S+\.+\S/) == null)
        throw new BadRequestError('Email malformed.', 400);

    if (typeof payload.username !== 'string') 
        throw new BadRequestError('Username must be of type string.', 400);

    if (payload.username.length === 0) 
        throw new BadRequestError('Username must not be an empty string.', 400);

    if (payload.username.match(/^\S*$/) == null) 
        throw new BadRequestError('Username must not have whitespace.', 400);

    if (payload.username.match(/@/) != null) 
        throw new BadRequestError('Username must not have an \'@\' symbol.', 400)

    if (typeof payload.password !== 'string')
        throw new BadRequestError('Password must be of type string.', 400);

    if (payload.password.length < 8)
        throw new BadRequestError('Password must have a length greater than 8 characters.', 400);

    if (payload.password.match(/^\S*$/) == null) 
        throw new BadRequestError('Password must not have whitespace.', 400);
};

const handleRegisterRequest = async (req, res) => {
    console.log(req.body);
    //Validate the body.
    validateRegisterBody(req.body);

    //TODO check for collisions.

    let { hash, salt } = generatePasswordHash(req.body.password);

    await createUser(req.body.username, req.body.email, hash, salt);

    res.status(200).json({
        success: true,
        msg: `User created.`,
    });
};

module.exports = (req, res, next) => {
    try {
        handleRegisterRequest(req, res);
    } catch (err) {
        next(err);
    }
}