/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const express = require('express');
const router = express.Router();

//All user routes.
router.use('/user', require('./user/user'));

module.exports = router;