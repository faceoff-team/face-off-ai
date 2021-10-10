/**
 * @author Nic Ballesteros
 * 10/9/21
 */

class AuthorizationError extends Error {
    constructor(message, status) {
        super(message);

        this.status = status;
        this.name = 'AuthorizationError';
    }
}

module.exports = AuthorizationError;
