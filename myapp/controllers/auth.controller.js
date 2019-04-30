const mongoose = require('mongoose');
const Game = require('../models/game.model')
const User = require('../models/user.model')
const passport = require('passport')

module.exports.index = ((req, res, next) => {
  
  /*const criteria = {};
  if (req.query.search) {
    console.log(req.query.search);
    const exp =  new RegExp(req.query.search, 'i');
    // Usando $in se puede hacer búsquedas por más de 2 campos!!! (SERÍA LA MEJORA FINAL)
    criteria.$or = [ { name: exp } ]
  }*/

  Game.find( /*criteria*/ )
    //.skip(50)
    .limit(10)
    .then(games =>  {
      res.render('index', { 
        title: 'BoardGamia games', 
        games/*, 
      search: req.query.search*/ })
    })
    .catch(next)
});

module.exports.register = ((req, res, next) => {
  res.render('auth/register', { title: 'Register'})
});

module.exports.doRegister = ((req, res, next) => {
  
  function renderWithErrors(errors) {
    res.render('auth/register', { 
      user: req.body,
      errors: errors,
      title: 'Register'})
  }

  User.findOne( { $or: [ { username: req.body.username }, {email: req.body.mail} ] } ) // AND con el username
    .then( user => {
      if (user) {
        if(user.username === req.body.username && user.email === req.body.email){
          renderWithErrors( { username: 'Username already registered', email: 'Email already registered' })
        }
        else {
          renderWithErrors( { username: 'Username already registered' } );
        }
      }
      else { 
        user = new User(req.body);
        user.avatarURL = `https://gravatar.com/avatar/${Math.floor(Math.random()*90000)}?s=400&d=robohash&r=x`
        return user.save()
          .then( user => res.redirect('/login') )
      }
    })
    .catch( error => {
      if (error instanceof mongoose.Error.ValidationError) { 
        renderWithErrors(error.errors)
      }
      else if (error.name === 'MongoError'){
        renderWithErrors( { email: 'Email already registered'} )
      }
      else { next(error); }
    } )
});


module.exports.login = ((req, res, next) => {
  res.render('auth/login', { title: 'Login'})
});

module.exports.doLogin = ((req, res, next) => {
  passport.authenticate('local-auth', (error, user, validation) => {
    if(error){
      next(error)
    }
    else if (!user) {
      res.render('auth/login', {
      user: req.body,
      errors: validation
      })
    }
    else {
      return req.login(user, (error) => {
        if (error) {
          next(error)
        }
        else{
          res.redirect('/')
        }
      })
    }
  })(req, res, next);
});

module.exports.loginWithIDPCallback = ((req, res, next) => {
  const { idp } = req.params;
  passport.authenticate(`${idp}-auth`, (error, user) => {
    if (error) { next(error) }
    else {
      req.login(user, (error) => {
        if (error) { next(error) }
        else { res.redirect('/') }
      })
    }
  })(req, res, next)
})

module.exports.logout = ((req, res, next) => {
  req.logout();
  res.redirect('/login');
})