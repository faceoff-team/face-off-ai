/**
 * @author Nic Ballesteros
 * @description This file handles all requests to /api/challenge
 */

const express = require('express');
const router = express.Router();

router.get(`/`, require('./get').getAll(req, res));

router.get(`/:challengeID`, require('./get').get(req, res));

module.exports = router;