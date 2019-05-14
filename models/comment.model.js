const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: [30, 'Minimum 30 chars dude'],
    maxlength: [150, 'Come on mate, i dont wanna know your entire life ;)'],
  },
  rate: {
    type:Number,
    required: true,
    min: 0,
    max: 5
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps:true })

commentSchema.index({game: 1, user: 1}, { unique: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment