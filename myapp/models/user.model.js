const mongoose = require('mongoose');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim : true,
    match: EMAIL_PATTERN
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  age: Number,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  avatar: String,
  games: [{
    game_id: String,
    owned: Boolean,
    wished: Boolean,
    toChange: Boolean
  }],
  chatRoom: String,
  network:[{
    user_id: String,
    follow: Boolean,
    Blocked: Boolean
  }]
}, { timestamps:true });

const User = mongoose.model('User', userSchema);
module.exports = User;