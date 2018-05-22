'use strict';

const mongoose = require('mongoose');

//properties of an NPC
//First and Last name required, but does not need to be unique
const npcSchema = mongoose.Schema({
  firstName : {type: String, required: true},
  lastName : {type: String, required: true},
  isMurderer : {type: Boolean, default: false },
  isAlive: {type: Mixed, default: true}

  // isAlive : {type: Boolean, default: true},

  //KRM: technically canDie === !isMurderer. Can probably skip this key
  // canDie : {type: Boolean, default: true}
});


//KRM: should force "isMurderer:true" key-value pair to be unique (only one murderer, thanks. need test via postman)
npcSchema.index({isMurderer: 1}, {unique: true, partialFilterExpression: {isMurderer: true}});


//KRM: I *think* this will force the murderer to always be alive. The downside is that this could lead to a turn in which there is no new victim. need test via postman
npcSchema.pre('save', function () {
  if(this.isMurderer === true){
    return this.isAlive === true;
  }
});


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