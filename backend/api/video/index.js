/**
 * @author Nic Ballesteros
 * @description This file handles all video endpoints.
 * 11/4/21
 */

const express = require('express');
const router = express.Router();

const { get, getAll, getSad, getHappy, getByID } = require('./get');

router.get('/sad', getSad);
router.get('/happy', getHappy);
router.get('scary', getScary);
router.get('/', getAll);
router.get('/byID/:id', getByID);
router.get('/:id', get);

router.post('/', require('./create'));

module.exports = router;