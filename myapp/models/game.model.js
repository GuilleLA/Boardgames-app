const mongoose   = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  image_url: {
    type: String,
    default: 'https://www.science-emergence.com/media/images/thumbnails_1000_1000/question-mark-img.JPEG'
  },
  year_published: {
    type: Number
  },
  min_players: {
    type: Number,
    required: true,
    min: 1
  },
  max_players: {
    type: Number,
    required: true,
    min: 1
  },
  max_playtime: Number,
  num_user_ratings: Number,
  average_user_rating: Number,
  min_age: Number,
  description:{
    type: String,
    required: true,
    minlength: [50, 'Minimun 50 characters, dont be lazy!! ;)'],
  },
  rules_url: String,
  price: {
    type: String,
    required: true,
    //match: regex
  }
}, { timestamps: true})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
