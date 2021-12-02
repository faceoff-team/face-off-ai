/**
 * @author Nic Ballesteros
 * @description This file tests the user folder
 * 12/1/21
 */

const register = require('./register.test');
const login = require('./login.test');

function suite(app) {
  describe('POST /api/user/register', () => {
    register(app);
  });

  describe('POST /api/user/login', () => {
    login(app);
  });
}

module.exports = suite;