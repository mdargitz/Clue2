'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Npc = require('../models/npc');


//GET all NPC's
router.get('/', (req,res, next)=>{
  Npc.find()
    .then( results => {
      if(results) {
        return res.json();
      }
      return next();
    });
});

//POST a new NPC (not used in app- for testing)

module.exports = router;