/**
 * @author Nic Ballesteros
 * @description This file calls google apis to send an email.
 * 11/12/21
 */

// const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const REFRESH_TOKEN = process.env.REFRESH;

const oauth2Client = new OAuth2(
  process.env.OAUTHCLIENTID,
  process.env.OAUTHCLIENTSECRET,
  "https://developers.google.com/oauthplayground",
);

const init = async () => {
  try {
    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    const { token } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials({access_token: token});
  } catch (err) {
    console.error(err);
  }
}

const sendMail = async (to, subject, html) => {
  const gmail = google.gmail({version: 'v1', auth: oauth2Client});

  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Faceoff AI Bot <faceoffbot81@gmail.com>',
    `To: <${to}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    `${html}`,
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });

  return res;
}

module.exports = {
  init,
  sendMail,
};

// const createTransporter = async () => {
//   try {
//     const oauth2Client = new OAuth2(
//       process.env.OAUTHCLIENTID,
//       process.env.OAUTHCLIENTSECRET,
//       "https://developers.google.com/oauthplayground"
//     );

//     oauth2Client.setCredentials({
//       refresh_token: process.env.REFRESH
//     });

//     const accessToken = await new Promise((resolve, reject) => {
//       oauth2Client.getAccessToken((err, token) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(token);
//       });
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "faceoffbot81@gmail.com",
//         accessToken,
//         clientId: process.env.OAUTHCLIENTID,
//         clientSecret: process.env.OAUTHCLIENTSECRET,
//         refreshToken: process.env.REFRESH
//       },
//       tls:{
//         rejectUnauthorized:false
//       }
//     });

//     return transporter;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

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

// module.exports = createTransporter;
