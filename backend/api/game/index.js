/**
 * @author Nic Ballesteros
 * @description This file handles all game endpoints.
 * 11/3/21
 */

const express = require('express');
const { authenticate } = require('../../db/auth');
const router = express.Router();

const { get, getAll, getAllUser } = require('./get');

router.get('/all/:id', getAllUser);

router.get('/:id', get);

router.get('/all/', getAll);

router.post('/', require('./create'));

//router.put('/:id', require('./update'))

module.exports = router;
