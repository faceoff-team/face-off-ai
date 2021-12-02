/**
 * @author Nic Ballesteros
 * @description This file tests the login function.
 * 12/1/21
 */

const { post } = require('../../../test/utils');

function suite(app) {
  it(`should fail when user is not defined`, (done) => {
    post(done, app, `/api/user/login`, null, 400, {
      success: false,
      msg: `User property must be defined.`,
    }, null, {
      password: "12345678",
    });
  });

  it(`should fail when user is not a string`, (done) => {
    post(done, app, `/api/user/login`, null, 400, {
      success: false,
      msg: `Username must be of type string.`,
    }, null, {
      user: 1,
      password: "12345678",
    });
  });

  it(`should fail when user is an empty string.`, (done) => {
    post(done, app, `/api/user/login`, null, 400, {
      success: false,
      msg: `Username must not be an empty string.`,
    }, null, {
      user: '',
      password: "1234",
    });
  });

  it(`should fail when password is not defined`, (done) => {
    post(done, app, `/api/user/login`, null, 400, {
      success: false,
      msg: `Password property must be defined.`,
    }, null, {
      user: 'test_user_1233kjdkfaoiei',
    });
  });

  it(`should fail when password is not a string`, (done) => {
    post(done, app, `/api/user/login`, null, 400, {
      success: false,
      msg: `Password must be of type string.`,
    }, null, {
      user: 'test_user_1233kjdkfaoiei',
      password: 1234,
    });
  });

  it(`should log in a user`, (done) => {
    post(done, app, `/api/user/login`, null, 200, {
      success: true,
      msg: `User created.`,
    }, null, {
      user: "test_user_1233kjdkfaoiei",
      password: "12345678",
    });
  });

  it(`should login with an emaiil.`, (done) => {
    post(done, app, `/api/user/login`, null, 403, {
      success: false,
      msg: `Username already in use.`,
    }, null, {
      user: "testusersemail@thisisamadeupdomain.com",
      password: "12345678",
    });
  });
}

module.exports = suite;