const mongoose = require('mongoose')
const Game     = require('../models/game.model')
const passport = require('passport')

module.exports.search = ((req, res, next) => {
  const user = req.user
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
        user, 
        search: req.query.search })
    })
    .catch(next)
});

module.exports.searchModule = ((req, res, next) => {
  const user = req.user
  const criteria = {};

  console.log('QUERY: ', req.query);

  if (req.query.name) {
    { name: criteria.name = new RegExp(req.query.name, 'i') };
  }

  if (req.query.yearPublished) { 
    { yearPublished: criteria.yearPublished = { $gte: parseInt(req.query.yearPublished, 10) } }; 
  }

  if (req.query.minPlayers) {
    { minPlayers : criteria.minPlayers = { $gte: parseInt(req.query.minPlayers, 10) } };
  }

  if (req.query.maxPlayers) {
    { maxPlayers : criteria.maxPlayers = { $lte: parseInt(req.query.maxPlayers, 10) } };
  }

  if (req.query.maxPlaytime) {
    { maxPlaytime : criteria.maxPlaytime = { $gte: parseInt(req.query.maxPlaytime, 10) } };
  }

  if (req.query.averageUserRating) {
    { averageUserRating : criteria.averageUserRating = { $gte: parseFloat(req.query.averageUserRating) } };
  }

  if (req.query.minAge)  {
    { minAge: criteria.minAge = { $gte: parseInt(req.query.minAge, 10) } };
  }

  if (req.query.price) {
    { price: criteria.price = { $lte: parseFloat(req.query.price) }};
  }

  Game.find( criteria )
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games,
        user, 
        search: req.query })
    })
    .catch(next)
});