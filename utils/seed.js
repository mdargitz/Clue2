'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const NPC = require('../models/npc');

const seedNPC = require('../db/seedNpc');


mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
        NPC.insertMany(seedNPC)
      
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
