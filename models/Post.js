const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: String,
    default: Date.now.toString()
  },
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post