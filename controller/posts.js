const Post = require('../models/Post')

const getPosts = async (req, res, next) => {
  const posts = await Post.find()
  res.json(posts)
}

const createPost = async (req, res, next) => {
  const post = new Post(req.body)
  await post.save()
  res.json(post)
}

const getPostById = async (req, res, next) => {
  const post = await Post.findById(req.params.id)
  res.json(post)
}

module.exports = {
  getPosts,
  createPost,
  getPostById
}