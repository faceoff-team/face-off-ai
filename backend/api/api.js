/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const express = require('express');
const router = express.Router();

//All user routes.
router.use('/user', require('./user/user'));
router.use('/score', require('./score'));
router.use('/challenge', require('./challenge'));
router.use('/game', require('./game'));
module.exports = router;