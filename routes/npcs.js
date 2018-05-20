'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Npc = require('../models/npc');


//GET all NPC's
router.get('/', (req,res, next)=>{
  res.json({'test':'a thing'});
});

module.exports = router;