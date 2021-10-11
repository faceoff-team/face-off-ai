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

    if (typeof body.email !== 'string')
        throw new BadRequestError('Email must be of type string.', 400);

    if (body.email.length === 0)
        throw new BadRequestError('Email must not be an empty string.', 400);

    if (body.email.match(/\S+\@+\S+\.+\S/) == null)
        throw new BadRequestError('Email malformed.', 400);

    if (typeof body.username !== 'string') 
        throw new BadRequestError('User must be of type string.', 400);

    if (body.username.length === 0) 
        throw new BadRequestError('User must not be an empty string.', 400);

    if (body.username.match(/^\S*$/) == null) 
        throw new BadRequestError('User must not have whitespace.', 400);

    if (body.username.match(/@/) != null) 
        throw new BadRequestError('User must not have an \'@\' symbol.', 400)

    if (typeof body.password !== 'string')
        throw new BadRequestError('Password must be of type string.', 400);

    if (body.password.length < 8)
        throw new BadRequestError('Password must have a length greater than 8 characters.', 400);

    if (body.password.match(/^\S*$/) == null) 
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

module.exports = async (req, res, next) => {
    try {
        await handleRegisterRequest(req, res);
    } catch (err) {
        next(err);
    }
}