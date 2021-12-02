/**
 * @author Nic Ballesteros
 * @description This file tests the profile function of the user folder.
 * 12/2/21
 */

const { get } = require('../../../test/utils');

let playerToken;

function getProfileToken(app) {
  before(() => {
    playerToken = global.playerToken;
  });

  it(`should fail if no token is provided`, (done) => {
    get(done, app, `/api/user/profile`, null, 400, {
      success: false,
      msg: `No usename provided.`,
    }, null);
  });

  it(`should return the profile`, (done) => {
    get(done, app, `/api/user/profile`, playerToken, 400, {
      success: false,
      msg: `User must be of type string.`,
    }, user);
  });
}

function getProfileWOToken(app) {
  it(`should fail when user is an empty string.`, (done) => {
    get(done, app, `/api/user/profile`, null, 400, {
      success: false,
      msg: `User must not be an empty string.`,
    }, null, {
      user: '',
      password: "1234",
    });
  });

  it(`should fail when password is not defined`, (done) => {
    get(done, app, `/api/user/profile`, null, 400, {
      success: false,
      msg: `Password property must be defined.`,
    }, null, {
      user: 'test_user_1233kjdkfaoiei',
    });
  });

  it(`should fail when password is not a string`, (done) => {
    get(done, app, `/api/user/profile`, null, 400, {
      success: false,
      msg: `Password must be of type string.`,
    }, null, {
      user: 'test_user_1233kjdkfaoiei',
      password: 1234,
    });
  });

  it(`should fail when password is an empty string`, (done) => {
    get(done, app, `/api/user/profile`, null, 400, {
      success: false,
      msg: `Password must not be an empty string.`,
    }, null, {
      user: 'test_user_1233kjdkfaoiei',
      password: '',
    });
  });

  it(`should fail on an incorrect password`, (done) => {
    get(done, app, `/api/user/profile`, null, 401, {
      success: false,
      msg: `Username or password incorrect.`,
    }, null, {
      user: "test_user_1233kjdkfaoiei",
      password: "87654321",
    });
  });

  it(`should log in a user`, (done) => {
    get(done, app, `/api/user/profile`, null, 200, {
      success: true,
      msg: `User successfully logged in.`,
    }, null, {
      user: "test_user_1233kjdkfaoiei",
      password: "12345678",
    });
  });

  it(`should profile with an email.`, (done) => {
    get(done, app, `/api/user/profile`, null, 200, {
      success: true,
      msg: `User successfully logged in.`,
    }, null, {
      user: "testusersemail@thisisamadeupdomain.com",
      password: "12345678",
    });
  });
}

module.exports = {
  getProfileToken,
};