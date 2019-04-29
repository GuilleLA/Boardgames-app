var mongoose        = require('mongoose')
var User            = require('../models/user.model')
var Game            = require('../models/game.model')


module.exports.list =((req, res, next) => {
  User.find()
    .then(users => res.render('users/list', {title: 'Users', users}))
    .catch(next)
})

module.exports.profile = ((req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .populate('games.game')
    .then(user => {
      console.log(user);
      res.render('users/profile', { title: `${user.username} profile`, user })
    })
    .catch(next)
})

module.exports.settings = ((req, res, next) => {
  const id = req.params.id
  
  User.findById(id)
    .then( user => res.render('users/settings', {title: 'Profile settings', user}))
    .catch(next)
})

module.exports.doSettings = ((req, res, next) => {
  const id = req.params.id
  console.log(id)

  function renderWithErrors(errors) {
    res.render('users/settings', { 
      user: req.body,
      errors: errors,
      title: 'settings'})
  }

  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.redirect(`/users/${user.id}`)
      } else {
        next(createError(404, 'user not found'))
      } 
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) { 
        renderWithErrors(error.errors)
      }
      else {
        next(error);
      }
    })
})