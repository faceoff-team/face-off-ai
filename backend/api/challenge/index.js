/**
 * @author Nic Ballesteros
 * @description This file handles all requests to /api/challenge
 */

const express = require('express');
const router = express.Router();

const { get, getAll } = require('./get');

router.get(`/`, getAll);

router.get(`/:challengeID`, get);

module.exports = router;