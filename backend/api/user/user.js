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

const { getProfile, putProfile } = require('./profile');

router.get(`/profile`, authenticate, getProfile);

router.post(`/profile/pic`, authenticate, require('./profilePic'));

router.get(`/profile/:id`, getProfile);

router.put(`/profile`, authenticate, putProfile);

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


module.exports = router;