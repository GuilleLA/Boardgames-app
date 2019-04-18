const mongoose = require('mongoose');
const Game = require('../models/game.model')

module.exports.index = ((req, res, next) => {
  Game.find()
    .then(games =>  {
      res.render('index', { title: 'Boardgamia games', games })
    })
    .catch(next)
});

module.exports.register = ((req, res, next) => {
      res.render('auth/register', { title: 'Boardgamia games', games })
    })
});