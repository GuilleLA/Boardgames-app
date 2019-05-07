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
    criteria.name =  new RegExp(req.query.name, 'i');
  }

  if (req.query.yearPublished) {
    { yearPublished: 
    criteria.yearPublished = { $gte: parseInt(req.query.yearPublished, 10) } } 
  }

  if (req.query.minPlayers) {
    criteria.minPlayers = parseInt(req.query.minPlayers, 10);
  }

  if (req.query.maxPlayers) {
    criteria.maxPlayers = parseInt(req.query.maxPlayers, 10);
  }

  if (req.query.maxPlaytime) {
    criteria.maxPlaytime = parseInt(req.query.maxPlaytime, 10);
  }

  if (req.query.averageUserRating) {
    criteria.averageUserRating = parseFloat(req.query.averageUserRating);
  }

  if (req.query.minAge)  {
    criteria.minAge = parseInt(req.query.minAge, 10);
  }

  if (req.query.price) {
    criteria.price =  parseFloat(req.query.price);
  }



Game.find({ $and: [ { name: criteria.name }, 
  { yearPublished: { $gte: criteria.yearPublished } },
  { minPlayers : { $gte: criteria.minPlayers } },
  { maxPlayers : { $lte: criteria.maxPlayers } },
  { averageUserRating : { $gte: criteria.averageUserRating } },
  { maxPlaytime : { $gte: criteria.maxPlaytime } },
  { minAge: { $gte: criteria.minAge } },
  { price: { $lte: criteria.price }}
  ]})
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games,
        user, 
        search: req.query })
    })
    .catch(next)
});