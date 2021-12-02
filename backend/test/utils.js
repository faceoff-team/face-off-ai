/**
 * @author Nic Ballesteros
 * @description This file holds testing helper functions.
 * 11/21/21
 */

const request = require('supertest');
const { expect } = require('chai');

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
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        try {
          let success = msg.success;
          let mmm = msg.msg;

          expect(res.headers['Content-Type'], 'application/json');
          expect(res.status, code);

          expect(res).to.have.property('body');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.eql(success);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.eql(mmm);

          if (extraData) {
            expect(res.body).to.have.property(extraData)
            global.data = {};
            global.data[extraData] = res.body[extraData];
          }
          return done();
        } catch (err) {
          console.error(err);
          console.error(res.status);
          console.error(res.body);
          if (global.last_err) {
            console.error(global.last_err);
            console.error(global.last_err.stack);
          }

          return done(err);
        }
      });
    }

    return request(app)
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      try {
        let success = msg.success;
        let mmm = msg.msg;

        expect(res.headers['Content-Type'], 'application/json');
        expect(res.status, code);

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
          expect(res.body).to.have.property(extraData);
          global.data = {};
          global.data[extraData] = res.body[extraData];
        }
        return done();
      } catch(err) {
        console.error(err);
        console.error(res.status);
        console.error(res.body);
        if (global.last_err) {
          console.error(global.last_err);
          console.error(global.last_err.stack);
        }
        return done(err);
      }
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
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        try {
          let success = msg.success;
          let mmm = msg.msg;

          expect(res.headers['Content-Type'], 'application/json');
          expect(res.status, code);

          expect(res).to.have.property('body');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.eql(success);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.eql(mmm);

          if (extraData) {
            expect(res.body).to.have.property(extraData);
            global.data = {};
            global.data[extraData] = res.body[extraData];
          }
          return done();
        } catch (err) {
          console.error(err);
          console.error(res.status);
          console.error(res.body);
          if (global.last_err) {
            console.error(global.last_err);
            console.error(global.last_err.stack);
          }
          return done(err)
        }
      });
    }

    return request(app)
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      try {
        let success = msg.success;
        let mmm = msg.msg;

        expect(res.headers['Content-Type'], 'application/json');
        expect(res.status, code);

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
          expect(res.body).to.have.property(extraData);
          global.data = {};
          global.data[extraData] = res.body[extraData];
        }
        return done();
      } catch (err) {
        console.error(err);
        console.error(res.status);
        console.error(res.body);
        if (global.last_err) {
          console.error(global.last_err);
          console.error(global.last_err.stack);
        }
        return done(err);
      }
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
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        try {
          let success = msg.success;
          let mmm = msg.msg;

          expect(res.headers['Content-Type'], 'application/json');
          expect(res.status, code);

          expect(res).to.have.property('body');
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.eql(success);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.eql(mmm);

          if (extraData) {
            expect(res.body).to.have.property(extraData);
            global.data = {};
            global.data[extraData] = res.body[extraData];
          }

          return done();
        } catch (err) {
          console.error(err);
          console.error(res.status);
          console.error(res.body);
          if (global.last_err) {
            console.error(global.last_err);
            console.error(global.last_err.stack);
          }
          return done(err);
        }
      });
    }

    return request(app)
    .put(url)
    .send(body)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      try {
        let success = msg.success;
        let mmm = msg.msg;

        expect(res.headers['Content-Type'], 'application/json');
        expect(res.status, code);

        expect(res).to.have.property('body');
        expect(res.body).to.have.property('success');
        expect(res.body.success).to.be.eql(success);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.be.eql(mmm);

        if (extraData) {
          expect(res.body).to.have.property(extraData);
          global.data = {};
          global.data[extraData] = res.body[extraData];
        }
        return done();
      } catch (err) {
        console.error(err);
        console.error(res.status);
        console.error(res.body);
        if (global.last_err) {
          console.error(global.last_err)
          console.error(global.last_err.stack);
        }
        return done(err);
      }
    });
  };

  module.exports = {
    get: _it_get,
    post: _it_post,
    put: _it_put,
  };