/**
 * @author Nic Ballesteros
 * 10/9/21
 */

class BadRequestError extends Error {
    constructor(message, status) {
        super(message);

        this.status = status;
        this.name = 'BadRequestError';
    }
}

module.exports = BadRequestError;