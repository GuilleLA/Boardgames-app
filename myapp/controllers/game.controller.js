const mongoose = require('mongoose');
const Game     = require('../models/game.model')

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  
  Game.findById(id)
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};

module.exports.add = (req, res, next) => {
  const id = req.session.id;
  const gameId = req.params.id
  
  Game.findByIdAndUpdate(id, {$push: { games: { game: gameId, owned: true}}})
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};

module.exports.wish = (req, res, next) => {
  const id = req.session.id;
  const gameId = req.params.id
  
  Game.findByIdAndUpdate(id, {$push: { games: { game: gameId, wished: true}}})
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};


