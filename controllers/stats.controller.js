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
      const gamesOwned = users.map(item => {
        return item.games.map(item2 => {
          if(item2.owned === true){return item2.game.name}
      })})
      const gamesNames = gamesOwned.join().split(',')
      const namesArr = []
      gamesNames.forEach( item => {
        if(item === '') {}
        else if (namesArr.includes(item)) {}
        else {
          namesArr.push(item)
        }
      })

      const gamesArr = users.map(item => {
        return item.games.map(item2 => {
          if(item2.owned === true){return item2.game.id}
      })})
      const gamesArr2 = gamesArr.join().split(',')
      const checkArr = []
      gamesArr2.forEach( item => {
        if(item === '') {}
        else if (checkArr.includes(item)) {}
        else {
          checkArr.push(item)
        }
      })
      const finalArr = []
      let counter = 0;
      checkArr.forEach(item => {
        let num = 0;
        gamesArr.forEach(item2 => {
          if (item2.includes(item)) {
            num = num + 1
          }
        })
        finalArr.push([num, item, namesArr[counter]])
        counter = counter + 1
      })
      finalArr.sort((a, b) => b[0] - a[0])
      const solution = [[],[],[]]
      finalArr.forEach(item => {
        solution[0].push(item[0])
        solution[1].push(item[1])
        solution[2].push(item[2])
      })

      res.json(solution)
    })
    
    .catch(next)
})

module.exports.wishedMost = ((req, res, next) => {
  User.find()
    .populate('games.game')

    .then(users => {
      const gamesOwned = users.map(item => {
        return item.games.map(item2 => {
          if(item2.wished === true){return item2.game.name}
      })})
      const gamesNames = gamesOwned.join().split(',')
      const namesArr = []
      gamesNames.forEach( item => {
        if(item === '') {}
        else if (namesArr.includes(item)) {}
        else {
          namesArr.push(item)
        }
      })

      const gamesArr = users.map(item => {
        return item.games.map(item2 => {
          if(item2.wished === true){return item2.game.id}
      })})
      const gamesArr2 = gamesArr.join().split(',')
      const checkArr = []
      gamesArr2.forEach( item => {
        if(item === '') {}
        else if (checkArr.includes(item)) {}
        else {
          checkArr.push(item)
        }
      })
      const finalArr = []
      let counter = 0;
      checkArr.forEach(item => {
        let num = 0;
        gamesArr.forEach(item2 => {
          if (item2.includes(item)) {
            num = num + 1
          }
        })
        finalArr.push([num, item, namesArr[counter]])
        counter = counter + 1
      })
      finalArr.sort((a, b) => b[0] - a[0])
      const solution = [[],[],[]]
      finalArr.forEach(item => {
        solution[0].push(item[0])
        solution[1].push(item[1])
        solution[2].push(item[2])
      })

      res.json(solution)
    })
    
    .catch(next)
})

module.exports.exchangedMost = ((req, res, next) => {
  User.find()
    .populate('games.game')

    .then(users => {
      const gamesOwned = users.map(item => {
        return item.games.map(item2 => {
          if(item2.toChange === true){return item2.game.name}
      })})
      const gamesNames = gamesOwned.join().split(',')
      const namesArr = []
      gamesNames.forEach( item => {
        if(item === '') {}
        else if (namesArr.includes(item)) {}
        else {
          namesArr.push(item)
        }
      })

      const gamesArr = users.map(item => {
        return item.games.map(item2 => {
          if(item2.toChange === true){return item2.game.id}
      })})
      const gamesArr2 = gamesArr.join().split(',')
      const checkArr = []
      gamesArr2.forEach( item => {
        if(item === '') {}
        else if (checkArr.includes(item)) {}
        else {
          checkArr.push(item)
        }
      })
      const finalArr = []
      let counter = 0;
      checkArr.forEach(item => {
        let num = 0;
        gamesArr.forEach(item2 => {
          if (item2.includes(item)) {
            num = num + 1
          }
        })
        finalArr.push([num, item, namesArr[counter]])
        counter = counter + 1
      })
      finalArr.sort((a, b) => b[0] - a[0])
      const solution = [[],[],[]]
      finalArr.forEach(item => {
        solution[0].push(item[0])
        solution[1].push(item[1])
        solution[2].push(item[2])
      })

      res.json(solution)
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