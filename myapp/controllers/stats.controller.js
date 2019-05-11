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

module.exports.ownedMost = ((req, res, next) => {
  User.find()
    .populate('games.game')
    .then(users => {
      console.log(users[0].games)
      const gamesArr = users.map(item => {
        return item.games.map(item2 => {
          if(item2.owned === true){return item2}
      })})
      res.json(gamesArr)
    })
    .catch(next)
})

module.exports.ages = ((req, res, next) => {
  User.find()
    .then( users => {
      const less20 = users.filter(item => {
        if(item.age <= 20){return item}
      })
      const age20to30 = users.filter(item => {
        if(item.age > 20 && item.age <= 30){return item}
      })
      const age30to40 = users.filter(item => {
        if (item.age > 30 && item.age <= 40) {return item}
      })
      const above40 = users.filter(item => {
        if(item.age > 40){return item}
      })

      const counts = [less20.length, age20to30.length, age30to40.length, above40.length ]
      res.json(counts)
    })
    .catch(next)
})