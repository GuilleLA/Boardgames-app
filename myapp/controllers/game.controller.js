const mongoose = require('mongoose');
const Game     = require('../models/game.model');
const User     = require('../models/user.model')

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  
  Game.findById(id)
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};

module.exports.add = (req, res, next) => {
  const user = req.user;
  user.games.push({ game: req.params.id, owned: true});
  user.save()
    .then(user => res.redirect('/'))
    .catch(next)
};

module.exports.wish = (req, res, next) => {
  const id = req.session.id;
  const gameId = req.params.id
  
  Game.findByIdAndUpdate(id, {$push: { games: { game: gameId, owned: true}}})
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};


