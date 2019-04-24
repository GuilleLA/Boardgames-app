const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: [30, 'Minimum 30 chars dude'],
    maxlength: [150, 'Come on mate, i dont wanna know your entire life ;)'],
  },
  rate: Number,
  game: ,
  user: ,
})

commentSchema.index({game: 1, user: 1}, { unique: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment