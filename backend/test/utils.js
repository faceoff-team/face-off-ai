/**
 * @author Nic Ballesteros
 * @description This file holds testing helper functions.
 * 11/21/21
 */

const request = require('request');
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
  console.log(url);
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
};

module.exports = {
  put: _it_put,
  get: _it_get,
  post: _it_post,
};
