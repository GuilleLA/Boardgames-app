const mongoose = require('mongoose')
const Game     = require('../models/game.model')
const passport = require('passport')

module.exports.search = ((req, res, next) => {
  const criteria = {};
  if (req.query.search) {
    const exp =  new RegExp(req.query.search, 'i');
    // Usando $in se puede hacer búsquedas por más de 2 campos!!! (SERÍA LA MEJORA FINAL)
    criteria.$or = [ { name: exp } ]
  }

  Game.find( criteria )
    //.skip(50)
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games, 
        search: req.query.search })
    })
    .catch(next)
});

