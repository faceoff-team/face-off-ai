/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const express = require('express');
const router = express.Router();

const { authenticate } = require('../../db/auth');

/**
 * Login Register
 */

router.post(`/register`, require('./register.js'));

router.post(`/login`, require('./login.js'));

/**
 * Profile
 */

const { getProfile, putProfile, putProfileScores } = require('./profile');
const { profilePicPost, profilePicGet } = require('./profilePic');

router.get(`/profile`, authenticate, getProfile);
router.get('/profile/pic/:image', profilePicGet);
router.get(`/profile/:username`, getProfile);

router.put(`/profile`, authenticate, putProfile);
router.put("/profile/scores", authenticate, putProfileScores)

router.post(`/profile/pic`, authenticate, profilePicPost);

/**
 * Friends
 */

const { getFriends, postFriend } = require('./friend');

router.post(`/friend`, authenticate, postFriend);

router.get(`/friend`, authenticate, getFriends);

/**
 * User scores
 */

router.get(`/scores`, authenticate, require('./scores'));
router.get(`/leaderboard`, require('./leaderboard'));

/**
 * Forgot password.
 */

const { changeAuthPassword, changeUserPassword } = require('./reset');

router.post('/changepassword', authenticate, require('./changePassword'));
router.post('/forgotpassword', require('./forgotPassword'));

router.post('/reset', authenticate, changeAuthPassword);
router.post('/reset/:hash', changeUserPassword);


module.exports = router;