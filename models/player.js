'use strict';

const mongoose = require('mongoose');

//Properties of a player
// -canDie is always true, no need to store
// -isMurderer is always false, no need to store
const playerSchema = mongoose.Schema({
  name: {type: String, required: true},
  isAlive: {type: Boolean, default: true},
  won : {type: Boolean}
});

//Prettify database returns
playerSchema.set('toObject', {
  transform: function(doc,ret){
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Player', playerSchema);