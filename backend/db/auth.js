/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const crypto = require(`crypto`);
const jsonwebtoken = require(`jsonwebtoken`);

const fs = require(`fs`);
const path = require(`path`);
const AuthorizationError = require("../error/AuthorizationError");
const { getUserByKey } = require("./user");

const pubPath = path.join(__dirname, `..`, `auth`, `keys`, `id_rsa_pub.pem`);
const privPath = path.join(__dirname, `..`, `auth`, `keys`, `id_rsa_priv.pem`);

const PUB_KEY = fs.readFileSync(pubPath, 'utf8');
const PRIV_KEY = fs.readFileSync(privPath, 'utf8');

const issueJWT = (id) => {
    const payload = {
        sub: id,
        iat: Date.now() / 1000,
        exp: (Date.now() / 1000) + (60 * 60 * 3), //3 Hour limit.
    };

    //Generate JWT and Sign it.
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        algorithm: `RS256`,
    });

    return `Bearer ${signedToken}`;
};

const verifyJWT = (token) => {
    //Validate the token isn't null.
    if (!token) {
        throw new AuthorizationError(`Token is null.`, 401);
    }

    if (typeof token !== 'string') {
        throw new AuthorizationError(`Token should be a string.`, 401);
    }

    token = token.split(' ');

    if (token.length !== 2 || token[0] !== `Bearer` || token[1].match(/\S+\.\S+\.\S+/) == null) {
        throw new AuthorizationError(`The token is not in the correct format.`, 401);
    }

    token = token[1];

    try {
        return jsonwebtoken.verify(token, PUB_KEY, {
            algorithms: [`RS256`],
        });
    } catch (err) {
        err.status = 401;
        throw err;
    }
};

const generatePasswordHash = (password) => {
    //Generate 32 bytes randomly for the salt.
    let salt = crypto.randomBytes(32).toString('hex');

    //Hash the password and the salt.
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt,
        hash,
    };
};

const verifyPassword = (password, salt, hash) => {
    //Calculate the hash.
    let calcHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return calcHash === hash;
};

const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new AuthorizationError(`No key provided for protected API.`, 401);
        }

        let jwt = verifyJWT(req.headers.authorization);

        //Get the user from the database.
        req.user = (await getUserByKey(jwt.sub))[0];  
    } catch (err) {
        next(err);
    }
}

module.exports = {
    issueJWT,
    verifyJWT,
    generatePasswordHash,
    verifyPassword,
    authenticate,
};