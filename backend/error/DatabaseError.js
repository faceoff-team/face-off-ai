/**
 * @author Nic Ballesteros
 * 11/11/21
 */

class DatabaseError extends Error {
    constructor(message, status) {
        super(message);

        this.status = status;
        this.name = 'DatabaseError';
    }
}

module.exports = DatabaseError;