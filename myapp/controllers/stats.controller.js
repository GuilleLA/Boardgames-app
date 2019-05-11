var mongoose        = require('mongoose')
var User            = require('../models/user.model')
var Game            = require('../models/game.model')


module.exports.stats =((req, res, next) => {
  const user = req.user;

  User.find()
    .then(users => {
      res.render('stats/stats', {
        title: 'BoardGamia stats',
        user,
        users
      })
    })
    .catch(next)
  
  
})

module.exports.coordinates = ((req, res, next) => {
  User.find()
    .then(users => {
      const coordinates = users.map(item => item.location)
      res.json(coordinates)
    })
    .catch(next)
})
