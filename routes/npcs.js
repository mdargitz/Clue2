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

//PUT update a random NPC
router.put('/random', (req, res, next)=>{
  const updateableFields = ['isAlive', 'isMurderer'];
  const updatedNpc = {};
  updateableFields.map(field => {
    if (field in req.body){
      updatedNpc[field] = req.body[field];
    }
  });
  Npc.find()
    .then(results => {
      return Math.floor(Math.random() * results.length);
    })
    .then(random => {
      return Npc.find().limit(1).skip(random);
    })
    .then(result => {
      return Npc.findOneAndUpdate({id : result.id}, updatedNpc, {new : true});
    })
    .then(result => res.json(result));

});


module.exports = router;