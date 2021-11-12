/**
 * @author Nic Ballesteros
 * @description This file initializes the email connection.
 * 11/12/21
 */

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'faceoffbot81@gmail.com',
    pass: process.env.EMAIL_PASS,
  }
});

module.exports = transport;
