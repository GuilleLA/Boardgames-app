var mongoose        = require('mongoose')
var User            = require('../models/user.model')


module.exports.list =((req, res, next) => {
  User.find()
    .then(users => res.render('users/list', {title: 'Users', users}))
    .catch(next)
})

module.exports.profile = ((req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then( user => res.render('users/profile', { title: `${user.username} profile`, user } ) )
    .catch( next )
})

module.exports.settings = ((req, res, next) => {
  res.render('users/settings', {title: 'Profile settings'})
})

module.exports.doSettings = ((req, res, next) => {
  
})