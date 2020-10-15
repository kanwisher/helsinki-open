/* eslint-disable prefer-reflect */
/* eslint-disable no-underscore-dangle */


const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

