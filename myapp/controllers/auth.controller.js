const mongoose = require('mongoose');
const Game = require('../models/game.model')
const User = require('../models/user.model')

module.exports.index = ((req, res, next) => {
  Game.find().limit(12)
    .then(games =>  {
      res.render('index', { title: 'BoardGamia games', games })
    })
    .catch(next)
});

module.exports.register = ((req, res, next) => {
  res.render('auth/register', { title: 'Register'})
});

module.exports.doRegister = (req, res, next) => {
  
  function renderWithErrors(errors) {
    res.render('auth/register', { 
      user: req.body,
      errors: errors,
      title: 'Register'})
  }

  User.findOne( { email: req.body.mail } ) // AND con el username
    .then( user => {
      if (user) { 
        console.log('ERROR_1');
        renderWithErrors( { email: 'Email already registered' } );
      }
      else { 
        user = new User(req.body);
        return user.save()
          .then( user => res.redirect('/login') )
      }
    })
    .catch( error => {
      if (error instanceof mongoose.Error.ValidationError) { 
        console.log('ERROR_2');
        renderWithErrors(error.errors)
      }
      else { next(error); }
    } )
};


module.exports.login = ((req, res, next) => {
  res.render('auth/login', { title: 'Login'})
});

module.exports.doLogin = ((req, res, next) => {
  res.render('auth/register', { title: 'Login'})
});