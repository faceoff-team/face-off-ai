/**
 * @author Nic Ballesteros
 * @description This file handles all requests to the /scores route.
 * 
 * 10/22/21
 */

const express = require('express');
const { authenticate } = require(`../../db/auth`);

const router = express.Router();

router.get(`/:scoreID`, require(`./get`));

router.post(`/create`, authenticate, require(`./create`));