'use strict';

const express = require('express');
const router = express.Router();

const Npc = require('../models/npc');
const mongoose = require('mongoose');

//GET all NPC's
router.get('/', (req,res,next)=>{
  res.json('test');
});