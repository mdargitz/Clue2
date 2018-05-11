'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Player = require('../models/player');

router.post('/', (req, res, next) => {

 const { name } = req.body;
  const newPlayer = {
    name,
    isAlive: true,
    won: 0
  };

 return Player.create(newPlayer)
    .then ( (result) => {
        return res.status(201).location(`/api/users/${result.id}`).json(result);
    });
});

module.exports = router;