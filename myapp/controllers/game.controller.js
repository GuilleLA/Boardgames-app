const mongoose = require('mongoose');
const Game     = require('../models/game.model')

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  
  Game.findById(id)
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};
