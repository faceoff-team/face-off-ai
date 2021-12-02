/**
 * @author Nic Ballesteros
 * @description This file tests the user folder
 * 12/1/21
 */

const register = require('./register.test');
const login = require('./login.test');
const { getProfileToken } = require('./profile.test');

function suite(app) {
  describe('POST /api/user/register', () => {
    register(app);
  });

  describe('POST /api/user/login', () => {
    login(app);
  });

  describe('GET /api/user/profile WITH Token', () => {
    getProfileToken(app);
  });
}

module.exports = suite;