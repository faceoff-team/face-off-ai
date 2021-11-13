/**
 * @author Nic Ballesteros
 * @description This file initializes the email connection.
 * 11/12/21
 */

const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.OAUTHCLIENTID,
    process.env.OAUTHCLIENTSECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "faceoffbot81@gmail.com",
      accessToken,
      clientId: process.env.OAUTHCLIENTID,
      clientSecret: process.env.OAUTHCLIENTSECRET,
      refreshToken: process.env.REFRESH
    }
  });

  return transporter;
};

// const oauth2Client = new OAuth2(
//     process.env.OAUTHCLIENTID,
//     process.env.OAUTHCLIENTSECRET,
//     "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH
// });


// let transport = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     XOAuth2: {
//       user: "faceoffbot81@gmail.com",
//       clientId: process.env.OAUTHCLIENTID,
//       clientSecret: process.env.OAUTHCLIENTSECRET,
//     }
//   }
// });

(async () => {
  module.exports = await createTransporter();
})
