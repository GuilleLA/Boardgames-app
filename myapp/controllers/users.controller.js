var mongoose = require('mongoose')
var User = require('../models/user.model')

module.exports.list =((req, res, next) => {
  User.find()
    .then(users => res.render('users/list', {title: 'Users', users}))
    .catch(next)
})