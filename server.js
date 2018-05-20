'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const playersRouter = require('./routes/players');
const npcsRouter = require('./routes/npcs');
const { PORT, MONGODB_URI } = require('./config');


app.use(express.static('public'));
app.use(express.json());

app.use('/api/players', playersRouter);
app.use('/api/npcs', npcsRouter);




// Listen for incoming connections
if (require.main === module) {
  mongoose.connect(MONGODB_URI)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error('\n === Did you remember to start `mongod`? === \n');
      console.error(err);
    });
  
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}
  
module.exports = app; // Export for testing
  