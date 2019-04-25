const mongoose   = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  imageURL: {
    type: String,
    default: 'https://www.science-emergence.com/media/images/thumbnails_1000_1000/question-mark-img.JPEG'
  },
  yearPublished: {
    type: Number
  },
  minPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 1
  },
  maxPlaytime: Number,
  numUserRating: Number,
  averageUserRating: Number,
  minAge: Number,
  description:{
    type: String,
    required: true,
    minlength: [50, 'Minimun 50 characters, dont be lazy!! ;)'],
  },
  rulesURL: String,
  price: {
    type: String,
    required: true,
    //match: regex,
    default: '0.00'
  }
}, { timestamps: true})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
