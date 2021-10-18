/**
 * @author Nic Ballesteros
 * @description A testing file for the backend.
 * 
 * 10/18/21
 */

const mocha = require('mocha');
const { expect } = require('chai');
const request = require('supertest');

const app = require("./main.js");

/**
 * @param {String} should is a message that is displayed in the console.
 * @param {Object} app The express app that is pulled from the main file.
 * @param {String} url The path that is being tested in the express app.
 * @param {String} token The token used for authentication.
 * @param {Number} code The HTTP code that is expected.
 * @param {Object} msg The message that is expected back from the server.
 * @param {String} extraData Any other property that is expected to be in the return message from the server.
 * 
 * @returns {Function} Mocha testing suite.
 */

 function _it_get(done, app, url, token, code, msg, extraData) {
  if (token) {
    return request(app)
      .get(url)
      .set('Authorization', [token])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(code)
      .end((err, res) => {
          if (err) {
              return done(err);
          }

          let success = msg.success;
          let mmm = msg.msg;

          expect(res).to.have.property('body');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.eql(success);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.eql(mmm);

          if (extraData) {
              expect(res.body).to.have.property(extraData)
              data[extraData] = res.body[extraData];
          }

          return done();
      });
  }

  return request(app)
    .get(url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(code)
    .end((err, res) => {
        if (err) {
            return done(err);
        }

        let success = msg.success;
        let mmm = msg.msg;

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
            expect(res.body).to.have.property(extraData);
            data[extraData] = res.body[extraData];
        }

        return done();
    });
};

/**
* @param {String} should is a message that is displayed in the console.
* @param {Object} app The express app that is pulled from the main file.
* @param {String} url The path that is being tested in the express app.
* @param {String} token The token used for authentication.
* @param {Number} code The HTTP code that is expected.
* @param {Object} msg The message that is expected back from the server.
* @param {String} extraData Any other property that is expected to be in the return message from the server.
* @param {Object} body The body of the request that is to be made to the server.
* 
* @returns {Function} Mocha testing suite.
*/

function _it_post (done, app, url, token, code, msg, extraData, body) {
  if (token) {
    return request(app)
    .post(url)
    .set('Authorization', [token])
    .send(body)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(code)
    .end((err, res) => {
        if (err) {
            return done(err);
        }

        let success = msg.success;
        let mmm = msg.msg;

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
            expect(res.body).to.have.property(extraData);
            data[extraData] = res.body[extraData];
        }

        return done();
    });
  }

  return request(app)
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(code)
    .end((err, res) => {
        if (err) {
            return done(err);
        }

        let success = msg.success;
        let mmm = msg.msg;

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
            expect(res.body).to.have.property(extraData);
            data[extraData] = res.body[extraData];
        }

        return done();
    });
}

/**
* @param {String} should is a message that is displayed in the console.
* @param {Object} app The express app that is pulled from the main file.
* @param {String} url The path that is being tested in the express app.
* @param {String} token The token used for authentication.
* @param {Number} code The HTTP code that is expected.
* @param {Object} msg The message that is expected back from the server.
* @param {String} extraData Any other property that is expected to be in the return message from the server.
* @param {Object} body The body of the request that is to be made to the server.
* 
* @returns {Function} Mocha testing suite.
*/


function _it_put (done, app, url, token, code, msg, extraData, body) {
  if (token) {
    return request(app)
      .put(url)
      .set('Authorization', [token])
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(code)
      .end((err, res) => {
          if (err) {
              return done(err);
          }

          let success = msg.success;
          let mmm = msg.msg;

          expect(res).to.have.property('body');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.eql(success);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.eql(mmm);

          if (extraData) {
              expect(res.body).to.have.property(extraData)
              data[extraData] = res.body[extraData];
          }

          return done();
      });
  }

  return request(app)
    .put(url)
    .send(body)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(code)
    .end((err, res) => {
        if (err) {
            return done(err);
        }

        let success = msg.success;
        let mmm = msg.msg;

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
            expect(res.body).to.have.property(extraData)
            data[extraData] = res.body[extraData];
        }

        return done();
    });
}

/**
 * Begin Testing
 */

describe('POST /api/user/register', () => {
  it('should fail when email is not a string', (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: 'Email must be of type string.',
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: 1,
      });
  }); 

  it('should fail when email is empty', (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email must not be an empty string.`
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: '',
      });
  });

  it('should follow the construct of an email', (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemailthisisamadeupdomain.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "@thisisamadeupdomain.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@.com",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@thisisamadeupdomaincom",
      });
  });

  it(`should follow the construct of an email.`, (done) => {
      _it_post(done , app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Email malformed.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "1234",
          email: "testusersemail@",
      });
  });

  it(`should fail when username is not a string`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must be of type string.`,
      }, null, {
          username: 1,
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  })

  it(`should fail when username is an empty string.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not be an empty string.`,
      }, null, {
          username: '',
          password: "1234",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  })

  it(`should fail when username has whitespace.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not have whitespace.`,
      }, null, {
          username: 'hey soul sister',
          password: "1234",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when username has an @.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Username must not have an '@' symbol.`
      }, null, {
          username: 'heysoul@sister',
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password is not a string`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must be of type string.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: 1234,
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password has whitespace`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must not have whitespace.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: '12345678 9',
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when password is less than 8 characters.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
          success: false,
          msg: `Password must have a length greater than 8 characters.`,
      }, null, {
          username: 'test_user_1233kjdkfaoiei',
          password: '',
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when extra data is put into the body`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 400, {
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
      _it_post(done, app, `/api/user/register`, null, 200, {
          success: true,
          msg: `New user created.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "12345678",
          email: "testusersemail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when making a user with the same username.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 403, {
          success: false,
          msg: `This username already in use.`,
      }, null, {
          username: "test_user_1233kjdkfaoiei",
          password: "12345678",
          email: "someotheremail@thisisamadeupdomain.com",
      });
  });

  it(`should fail when making a user with the same email.`, (done) => {
      _it_post(done, app, `/api/user/register`, null, 403, {
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