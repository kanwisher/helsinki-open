/* eslint-disable prefer-reflect */
/* eslint-disable no-underscore-dangle */


const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

userSchema.set('toJSON', {
  transform (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.passwordHash
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User

