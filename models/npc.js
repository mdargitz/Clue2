'use strict';

const mongoose = require('mongoose');

//properties of an NPC
//First and Last name required, but does not need to be unique
const npcSchema = mongoose.Schema({
  firstName : {type: String, required: true},
  lastName : {type: String, required: true},
  isMurderer : {type: Boolean, default: false },
  isAlive: {type: Boolean, default: true},
});

//Forces "isMurderer:true" key-value pair to be unique
npcSchema.index({isMurderer: 1}, {unique: true, partialFilterExpression: {isMurderer: true}});

//Prettify database returns
npcSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

//Export the model
module.exports = mongoose.model('Npc', npcSchema);