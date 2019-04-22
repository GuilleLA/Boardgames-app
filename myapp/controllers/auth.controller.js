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
      res.render('auth/register', { title: 'Register'})
});

module.exports.doRegister = ((req, res, next) => {
  res.render('auth/register', { title: 'Register'})
});


module.exports.login = ((req, res, next) => {
  res.render('auth/login', { title: 'Login'})
});

module.exports.doLogin = ((req, res, next) => {
  res.render('auth/register', { title: 'Login'})
});