'use strict';

const express = require('express');
const router = express.Router();

const Npc = require('../models/npc');


//GET all NPC's
router.get('/', (req,res, next)=>{
  const filter = req.query;
  Npc.find(filter)
    .then( results => {
      if(results) {
        return res.json(results);
      }
      return next();
    })
    .catch(err => next(err));
});

// PUT a new NPC used for testing
// router.put('/:id', (req,res, next)=>{
// const {id} = req.params;
//   const updateableFields = ['isAlive', 'canDie','firstName', 'isMurderer'];
//   const updatedNpc = {};
//   updateableFields.map(field => {
//     if (field in req.body){
//       updatedNpc[field] = req.body[field];
//     }
//   });
  
//   let query;
//   if('isAlive' in updatedNpc){
//     query = {isMurderer: false};
//   }

//   Npc.findByIdAndUpdate(id, updatedNpc)
//     .then(result => res.json(result))
//     .catch(err => next(err));

// });


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
  console.log('welcome to random');
  const updateableFields = ['isAlive', 'isMurderer'];
  const updatedNpc = {};
  updateableFields.map(field => {
    if (field in req.body){
      updatedNpc[field] = req.body[field];
    }
  });

  //KRM: this is the good stuff; restricts query to only kill nonmurderers
  let query;
  if('isAlive' in updatedNpc){
    query = {isMurderer: false};
  }

  Npc.find(query)
    .then(results => {
      console.log('list of options', results);
      return Math.floor(Math.random() * results.length);
    })
    .then(random => {

      return Npc.find(query).limit(1).skip(random);
    })
    .then(result => {      
      return Npc.findOneAndUpdate({_id : result[0].id}, updatedNpc, {new : true});
    })
    .then(result => {
      console.log('final choice', result);
      return res.json(result);
    } )
    .catch(err => next(err));

});


module.exports = router;