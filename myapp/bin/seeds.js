require('dotenv').config()
const mongoose = require('mongoose')
const Game = require('../models/game.model')
const games = require('../data/games.json')
const striptags = require('striptags')

const correctedGames =  games.map(item => {
  item.description = striptags(item.description)
  return item
})

require('../config/db.config')



Game.create(correctedGames)
  .then(games => console.info(`${games.length} new games added to database`))
  .catch(error => console.error(error))
  .then(()=> mongoose.connection.close())