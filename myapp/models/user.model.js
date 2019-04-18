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
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;