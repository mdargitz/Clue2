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
        return res.json(results);
      }
      return next();
    })
    .catch(err => next(err));
});

//POST a new NPC (not used in app- for testing)
router.post('/', (req, res, next)=>{
  const newNpc = {firstName: req.body.firstName,
    lastName : req.body.lastName};

  Npc.create(newNpc)
    .then(result => {
      if (result){
        return res.status(201).json(result);
      }
      return next();
    })
    .catch(err => next(err));
});

module.exports = router;