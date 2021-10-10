/**
 * @author Nic Ballesteros
 * 10/9/21
 */

const express = require('express');
const router = express.Router();

router.post(`/register`, require('./register.js'));

module.exports = router;