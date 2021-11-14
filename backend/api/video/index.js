/**
 * @author Nic Ballesteros
 * @description This file handles all video endpoints.
 * 11/4/21
 */

const express = require('express');
const router = express.Router();

const { get, getAll, getAllEmotions } = require('./get');

router.get('/emotion', getAllEmotions)
router.get('/', getAll);
router.get('/:id', get);

router.post('/', require('./create'));

module.exports = router;