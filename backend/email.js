/**
 * @author Nic Ballesteros
 * @description This file initializes the email connection.
 * 11/12/21
 */

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    XOAuth2: {
      user: "faceoffbot81@gmail.com",
      clientId: process.env.OAUTHCLIENTID,
      clientSecret: process.env.OAUTHCLIENTSECRET,
    }
  }
});

module.exports = transport;
