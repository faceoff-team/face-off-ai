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

const { privateProfile, publicProfile, putProfile } = require('./profile');

router.get(`/profile`, authenticate, privateProfile);

router.get(`/profile/:id`, publicProfile);

router.put(`/profile`, authenticate, putProfile);

module.exports = router;