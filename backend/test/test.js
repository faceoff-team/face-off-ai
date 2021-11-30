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

describe('POST /api/user/register', () => {
  it('should fail when email is not a string', (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: 'Email must be of type string.',
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: 1,
      });
  });

  it('should fail when email is empty', (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email must not be an empty string.`
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: '',
      });
  });

  it('should follow the construct of an email', (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemailthisisamadeupdomain.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "@thisisamadeupdomain.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@thisisamadeupdomaincom",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      post(done , app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@",
      });
  });

  it(`should fail when username is not a string`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must be of type string.`,
      }, null, {
          username: 1,
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  })

  it(`should fail when username is an empty string.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not be an empty string.`,
      }, null, {
          username: '',
          password: "1234",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  })

  it(`should fail when username has whitespace.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not have whitespace.`,
      }, null, {
          username: 'hey soul sister',
          password: "1234",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when username has an @.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not have an '@' symbol.`
      }, null, {
          username: 'heysoul@sister',
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password is not a string`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must be of type string.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: 1234,
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password has whitespace`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must not have whitespace.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: '12345678 9',
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password is less than 8 characters.`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must have a length of at least 8 characters.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: '',
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when extra data is put into the body`, (done) => {
      post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Unknown Identifier.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: '12345678',
          email: "testusersemail@thisisamadeupdomain.com",
          someValue: 'x',
      });
  });

  it(`should create a new user`, (done) => {
      post(done, app, `/api/user/register`, null, 200, {
          success: true,
          msg: `New user created.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when making a user with the same username.`, (done) => {
      post(done, app, `/api/user/register`, null, 403, {
          success: false,
          msg: `This username already in use.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "12345678",
          email: "someotheremail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when making a user with the same email.`, (done) => {
      post(done, app, `/api/user/register`, null, 403, {
          success: false,
          msg: `This email already in use.`,
      }, null, {
          username: "some_test_user",
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  // //Create dummy user.

  // after(async () => {
  //     request(app)
  //         .post('/api/user/register')
  //         .send({
  //             username: "testUser2",
  //             password: "12345678",
  //             email: "newEmail@thisisamadeupdomain.com",
  //             userType: "coach",
  //             name: "Test User 2",
  //         })
  //         .end((err, res) => {
  //             if (err) 
  //                 console.error(err);

  //             // coachToken = res.body.token;
  //         });
  // });
});
