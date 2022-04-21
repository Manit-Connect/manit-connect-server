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
  commitee: {
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
  likes: {
    type: Number,
    default: 0
  }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post