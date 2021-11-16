/**
 * @author Nic Ballesteros
 * @description This file handles all game endpoints.
 * 11/3/21
 */

const express = require('express');
const { authenticate } = require('../../db/auth');
const router = express.Router();

const { get, getAll } = require('./get');

router.get('/', authenticate, getAll);

router.get('/:id', authenticate, get);

router.post('/', require('./create'));

module.exports = router;