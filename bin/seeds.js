require('dotenv').config()
const mongoose = require('mongoose')
const Game = require('../models/game.model')
const games = require('../data/games.json')
const striptags = require('striptags')

const correctedGames =  games.map(item => {
  const correctedGames2 = {
    name: item.name,
    imageURL: item.image_url,
    yearPublished: item.year_published,
    minPlayers: item.min_players,
    maxPlayers: item.max_players,
    maxPlaytime: item.max_playtime,
    numUserRating: item.num_user_ratings,
    averageUserRating: item.average_user_rating,
    minAge: item.min_age,
    description: striptags(item.description),
    rulesURL: item.rules_url,
    price: item.price
  }
  return correctedGames2
})


require('../config/db.config')



Game.create(correctedGames)
  .then(games => console.info(`${games.length} new games added to database`))
  .catch(error => console.error(error))
  .then(()=> mongoose.connection.close())