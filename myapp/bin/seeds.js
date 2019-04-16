require('dotenv').config()
const mongoose = require('mongoose')
const Game = require('../models/game.model')
const games = require('../data/games.json')

require('../config/db.config')

Game.create(games)
  .then(games => console.info(`${games.length} new games added to database`))
  .catch(error => console.error(error))
  .then(()=> mongoose.connection.close())