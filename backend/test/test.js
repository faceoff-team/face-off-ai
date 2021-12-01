/**
 * @author Nic Ballesteros
 * @description A testing file for the backend.
 * 
 * 10/18/21
 */

// const mocha = require('mocha');

const app = require("../main.js");

const { post, put, get } = require('./utils');

/**
 * Begin Testing
 */

const user = require('../api/user/tests/user.test');

describe('Test User Functions', () => {
  user(app);
});
